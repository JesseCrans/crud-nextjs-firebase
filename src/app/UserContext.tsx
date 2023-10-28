"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from './firebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo
} from 'firebase/auth';
import { ref, set, onValue } from "firebase/database";
import { get } from 'http';

interface defaultValue {
  user: User,
  userInfo: UserInfo,
  emailPasswordRegister: (email: string, password: string) => void,
  emailPasswordLogin: (email: string, password: string) => void,
  logout: () => void,
  googleLogin: () => void,
  githubLogin: () => void,
  loading: boolean
}

interface User {
  uid: string,
}

interface UserInfo {
  email: string,
  username: string,
  createdOn: string,
  lastLogin: string,
  photoURL: string
}

const UserContext = createContext({} as defaultValue);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [user, setUser] = useState({} as User);
  const [userInfo, setUserInfo] = useState({} as UserInfo); // [username, email, createdOn, lastLogin, photoURL
  const [loading, setLoading] = useState(true);

  const addUserToDatabase = async (user: any) => {
    const userRef = ref(db, 'users/' + user.uid);
    set(userRef, {
      username: user.displayName ? user.displayName : "",
      email: user.email ? user.email : "",
      createdOn: user.metadata.creationTime,
      lastLogin: user.metadata.lastSignInTime,
      photoURL: user.photoURL ? user.photoURL : "",
    });
  }

  const emailPasswordRegister = async (email: string, password: string) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      addUserToDatabase(user.user);
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const emailPasswordLogin = async (email: string, password: string) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const user = await signInWithPopup(auth, provider);
      addUserToDatabase(user.user);
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const githubLogin = async () => {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      addUserToDatabase(user);
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error: any) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser({} as User);
      }
    });

    return () => unsubscribe();
  }, [])

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 300)
      })
      setLoading(false);
    };
    checkAuthentication();

    const getUserFromDatabase = async () => {
      const userRef = ref(db, 'users/' + user.uid);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        setUserInfo(data);
      });
    }
    getUserFromDatabase();
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        userInfo,
        loading,
        emailPasswordLogin,
        emailPasswordRegister,
        logout,
        googleLogin,
        githubLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  )
};