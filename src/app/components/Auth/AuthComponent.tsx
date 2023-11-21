"use client";
import React, { FormEvent, useRef, useState } from "react";
import Image from "next/image";
import { googleSignUp, googleSignIn, EmailPasswordSignIn, EmailPasswordSignUp } from "@/app/context/Authcontext";
import style from "@/app/login/login.module.css";

interface AuthComponentProps {
  newUser: boolean
}

const AuthComponent: React.FC<AuthComponentProps> = ({ newUser }) => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const [errorInput, setErrorInput] = useState(false);
  const [errorConfirmPasswordInput, setErrorConfirmPasswordInput] = useState(false);
  const [errorCredentialsWrong, setErrorCredentialsWrong] = useState(false);

  /**
   * Handle google sign in
   */
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Handle google sign up
   */
  const handleGoogleSignUp = async () => {
    try {
      await googleSignUp();
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * handle email password sign in
   */
  const handleEmailPasswordSignIn = async () => {
    if (emailRef.current?.value && passwordRef.current?.value) {
      try {
        await EmailPasswordSignIn(emailRef.current.value, passwordRef.current.value);
      } catch (error) {
        setErrorCredentialsWrong(true);
      }
    } else {
      setErrorInput(true);
    }
  };

  /**
   * Handle email password sign up
   */
  const handleEmailPasswordSignUp = async () => {
    if (emailRef.current?.value && usernameRef.current?.value && passwordRef.current?.value && passwordConfirmRef.current?.value) {
      if (passwordRef.current?.value === passwordConfirmRef.current?.value) {
        try {
          await EmailPasswordSignUp(emailRef.current.value, passwordRef.current.value, usernameRef.current.value);
        } catch (error) {
          setErrorCredentialsWrong(true);
        }
      } else {
        setErrorConfirmPasswordInput(true);
      }
    } else {
      setErrorInput(true);
    }
  };

  const handleFormSign = (event: FormEvent) => {
    event?.preventDefault();
    if (newUser) {
      handleEmailPasswordSignUp();
    } else {
      handleEmailPasswordSignIn();
    }
  }

  return (
    <>
      <div>
        {errorCredentialsWrong ? <p className={style.error_credentials}>Aucune correspondance trouvé.</p> : null}
        <form onSubmit={handleFormSign}>
          {/* username */}
          {newUser ? (<div className={style["login_container-input__item"]}>
            {errorInput ? <p className={style.error_input}>Email requis</p> : null}
            <input
              className={style["login_container-input"]}
              type="text"
              name="username"
              placeholder="Username"
              ref={usernameRef}
            />
          </div>) : null}

          {/* Email */}
          <div className={style["login_container-input__item"]}>
            {errorInput ? <p className={style.error_input}>Email requis</p> : null}
            <input
              className={style["login_container-input"]}
              type="email"
              name="email"
              placeholder="Email"
              ref={emailRef}
            />
          </div>
          {/* Password */}
          <div className={style["login_container-input__item"]}>
            {errorInput ? <p className={style.error_input}>Mot de passe requis</p> : null}
            <input
              className={style["login_container-input"]}
              type="password"
              name="password"
              placeholder="Password"
              ref={passwordRef}
            />
          </div>

          {/* Confirm password */}
          {newUser ? (
            <div className={style["login_container-input__item"]}>
              {errorInput ? <p className={style.error_input}>Confirm password required</p> : null}
              {errorConfirmPasswordInput ? <p className={style.error_input}>Mot de passe différent</p> : null}
              <input
                className={style["login_container-input"]}
                type="password"
                name="confirm-password"
                placeholder="Confirm password"
                ref={passwordConfirmRef}
              />
            </div>
          ) : null}
          {/* Submit */}
          <input type="submit"
            className={style["login_container-btn"]}
            onClick={handleFormSign}
            value={newUser ? 'Sign up' : 'Sign in'}
          />
        </form>
      </div>

      <div className={style["login_container-other-method"]}>
        <Image
          className={style["login_container-google_auth_img"]}
          src="/images/google_logo_color.webp"
          alt="login with google"
          width={150}
          height={50}
          onClick={newUser ? handleGoogleSignUp : handleGoogleSignIn}
        />
      </div>
    </>
  );
};

export default AuthComponent;
