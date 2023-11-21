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
import { fetchData } from "../components/utilities/FetchData";
import { optionsFetch } from "../components/utilities/OptionsFetch";

interface AuthContextType {
  user: User | null;
}


const setUpNewUSer = async (userID: string) => {

  await fetchData(`/add/category/${userID}`, optionsFetch('POST', { title_category: 'Work' })).then(async (response) => {
    if (response && response[0]) {
      await fetchData(`/add/pomodoro/${userID}`, optionsFetch('POST', { category_id: response[0].id }));
    }
  });
}

export const fetchDataWithCredentials = async (
  user: User,
  username: string
) => {
  try {
    console.log(user);
    if (user && user.email && user.uid)
      fetchData('/add/user', optionsFetch('POST', { username: username, email: user.email, user_id: user.uid }))
        .then(() => {
          if (user.uid)
            setUpNewUSer(user?.uid);
        }).catch((error) => {
          console.error("Failed to fetch data:", error);
        });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};



export const EmailPasswordSignUp = (
  email: string,
  password: string,
  username: string
) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential: UserCredential) => {
      try {
        if (userCredential.user && username)
          await fetchDataWithCredentials(userCredential.user, username);
      } catch (error) {
        throw error;
      }
    })
    .catch((error) => {
      throw error;
    });
};



export const EmailPasswordSignIn = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};



export const googleSignIn = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};




export const googleSignUp = async () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(async (userCredential: UserCredential) => {
      try {
        if (userCredential.user.displayName)
          await fetchDataWithCredentials(userCredential.user, userCredential.user.displayName);
      } catch (error) {
        throw error;
      }
    })
    .catch((error) => {
      throw error;
    });
};



export const logOut = () => {
  signOut(auth);
};


const AuthContext = createContext<AuthContextType>({ user: null });

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      await fetchData(`/user/${currentUser?.uid}`, { method: 'GET' }).then((response) => {
        if (!response.length && currentUser && currentUser.displayName)
          fetchDataWithCredentials(currentUser, currentUser.displayName);
      });
      setUser(currentUser);
      if (!user) {
        router.push("/")
      };
    });
    return unsubscribe;
  }, [user]);

  return (
    <>
      <AuthContext.Provider
        value={{
          user
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};



export const userAuth = () => {
  return useContext(AuthContext);
};
