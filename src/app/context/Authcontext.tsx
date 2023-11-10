"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
  UserCredential,
} from "firebase/auth";

import { auth } from "@/firebase.config";
import { useRouter } from "next/navigation";

const AuthContext = createContext({});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  /**
   * Email password sign up method
   * @param email @type string 
   * @param password  @type string
   */
  const EmailPasswordSignUp = (email: string, password: string, username: string) => {
    try {
        createUserWithEmailAndPassword(auth, email, password).then( async (userCredential: UserCredential) => {
            try {
                await fetchDataWithCredentials(userCredential, username);
            }catch(error) {
                throw error;
            }
        });
       

    } catch (error) {
        throw error;
    }
  };

  const fetchDataWithCredentials = async (userCredential: UserCredential, username: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: userCredential.user.email,
                user_id: userCredential.user.uid
            }),
            
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log('Fetched data:', data);
        } else {
            console.error('Failed to fetch data:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};





  

  /**
    * Email password sign in method
   * @param email @type string 
   * @param password  @type string
   */
  const EmailPasswordSignIn = async (email: string, password: string) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        throw error;
    }
  };

  /**
   * Google sign in
   */
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  /**
   * Google sign up
   */
  const googleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then( async (userCredential: UserCredential) => {
      try {
        if(userCredential.user.displayName)
            await fetchDataWithCredentials(userCredential, userCredential.user.displayName);
      }catch(error) {
          throw error;
      }
  });
}

  /**
   * Log out
   */
  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if(!user)
        router.push('/');
    });
    return unsubscribe;
  }, [user]);

  return (
    <>
      <AuthContext.Provider
        value={{ user, googleSignIn, googleSignUp, logOut, EmailPasswordSignIn, EmailPasswordSignUp }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const userAuth = () => {
  return useContext(AuthContext);
};
