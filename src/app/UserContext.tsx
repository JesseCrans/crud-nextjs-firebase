"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from './firebase';
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

interface defaultValue {
  user: any,
  emailPasswordRegister: (email: string, password: string) => void,
  emailPasswordLogin: (email: string, password: string) => void,
  logout: () => void,
  googleLogin: () => void,
  githubLogin: () => void,
  loading: boolean
}

const UserContext = createContext({} as defaultValue);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const emailPasswordRegister = async (email: string, password: string) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
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
        setUser({});
      }
    });

    return () => unsubscribe();
  }, [])

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 200)
      })
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
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