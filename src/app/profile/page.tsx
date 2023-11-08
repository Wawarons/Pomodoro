"use client";
import React from "react";
import { userAuth } from "../Authcontext";
import Image from "next/image";
import style from '@/app/styles/profile.module.css'


const Profile = () => {
  const { user } = userAuth();

  console.log(user);

  return (
    <div className={style.profile_container}>
      {user ? (
        <>
          <h1>Profile</h1>
          <Image
            src={user.photoURL}
            alt="profile picture"
            width={50}
            height={50}
            className={style['profile_container-picture']}
          />
          <div className={style['profile_container-informations']}>
            <div className={style['profile_container-informations-item']}>
              <h3>Pseudo</h3>
              <h4>{user.displayName}</h4>
            </div>
            <div className={style['profile_container-informations-item']}>
              <h3>Email</h3>
              <h4>{user.email}</h4>
            </div>
          </div>
          
          
        </>
      ) : null}
    </div>
  );
};

export default Profile;
