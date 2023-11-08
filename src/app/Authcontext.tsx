'use client'
import React, { createContext, useContext, useState, useEffect }from 'react'
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, User } from 'firebase/auth';

import {auth} from '@/firebase.config';

const AuthContext = createContext({});

export const AuthContextProvider = ({children}: {children: React.ReactNode}) => {
    
    const [user, setUser] = useState<User | null>(null);

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
    }

    const logOut = () => {
        signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })
        return unsubscribe;
    }, [user]);

    return (
        <>
        {user ? 
            <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
                {children}
            </AuthContext.Provider>:null
        }
        </>
        
    )
}

export const userAuth = () => {
    return useContext(AuthContext);
}

