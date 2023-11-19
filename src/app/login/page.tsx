'use client'
import React, {useEffect, useState} from 'react'
import AuthComponent from '../components/Auth/AuthComponent';
import style from '@/app/styles/login.module.css'
import { userAuth } from '../context/Authcontext';

const Login = () => {

  const {user} = userAuth();
  const [newUser, setNewUser] = useState<boolean>(false);

  return (
    <div className={style.login_container}>
      {
        !user ?
        (
          <>
          <h5 className={style.choice_newUser} onClick={()=>setNewUser(!newUser)}>{newUser ? 'Sign in':'Sign up'}</h5>
          <h1>{newUser ? 'Sign up':'Sign In'}</h1>
          <AuthComponent newUser={newUser}/>
        </>
        ):null
      }
    </div>
  )
}

export default Login;