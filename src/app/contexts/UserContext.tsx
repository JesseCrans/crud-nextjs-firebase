"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from 'firebase/auth';
import { ref, set, onValue } from "firebase/database";

interface defaultValue {
  user: any,
  userInfo: UserInfo,
  emailPasswordRegister: (email: string, password: string) => void,
  emailPasswordLogin: (email: string, password: string) => void,
  logout: () => void,
  googleLogin: () => void,
  githubLogin: () => void,
  loading: boolean,
  error: string | undefined
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
  const [user, setUser] = useState({} as any);
  const [userInfo, setUserInfo] = useState({} as UserInfo); // [username, email, createdOn, lastLogin, photoURL
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('' as string | undefined);

  const addUserToDatabase = async (user: any) => {
    const userRef = ref(db, 'users/' + user.uid);
    set(userRef, {
      username: user.displayName ? user.displayName : "",
      email: user.email ? user.email : "",
      createdOn: user.metadata.creationTime,
      lastLogin: user.metadata.lastSignInTime,
      photoURL: user.photoURL ? user.photoURL : "",
    });
    console.log('added user to database')
  }

  const emailPasswordRegister = async (email: string, password: string) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      addUserToDatabase(user.user);
    } catch (error: any) {
      setError(error.message);
    }
  }

  const emailPasswordLogin = async (email: string, password: string) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      setError(error.message);
    }
  }

  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const user = await signInWithPopup(auth, provider);
      if (getAdditionalUserInfo(user)?.isNewUser) {
        console.log('new user');
        addUserToDatabase(user.user);
      }
    } catch (error: any) {
      setError(error.message);
    }
  }

  const githubLogin = async () => {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (getAdditionalUserInfo(result)?.isNewUser) {
        addUserToDatabase(user);
      }
    } catch (error: any) {
      setError(error.message);
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
        setUser({} as any);
      }
    });

    return () => unsubscribe();
  }, []);

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
        error
      }}
    >
      {children}
    </UserContext.Provider>
  )
};