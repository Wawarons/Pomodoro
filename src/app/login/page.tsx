'use client'
import React, {useState} from 'react'
import AuthComponent from '@/app/components/Auth/AuthComponent';
import { userAuth } from '../context/Authcontext';
import style from './login.module.css';
import HomeButton from '../components/utilities/HomeButton';

const Login = () => {

  const {user} = userAuth();
  const [newUser, setNewUser] = useState<boolean>(false);

  return (
    <>
    <HomeButton />
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
    </>
  )
}

export default Login;