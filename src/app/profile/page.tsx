"use client";
import React, { useEffect, useState } from "react";
import HomeButton from "../components/utilities/HomeButton";
import ReportCircle from "../components/utilities/ReportCircle";
import { userAuth } from "../context/Authcontext";
import {logOut} from '@/app/context/Authcontext';
import style from './profile.module.css';

type userData = {
  email: string,
  username: string,
  createdAt: Date
}

const Profile = () => {
  const { user } = userAuth();
  const [userData, setUserData] = useState<userData | null>(null);
  useEffect( () => {
    const fetchData = async () => {
      if(user){
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${user.uid}`);
        response.json().then((data) => {
          setUserData(data[0]);
        });
      }
    }
    if(user && userData === null) fetchData();
  }, [user, userData]);


  return (
    <>
    <HomeButton />
    <div className={style.logout} onClick={()=>logOut()}>Log out</div>
    <h1 className={style.profile__title}>Profile</h1>
    <div className={style.profile_container}>
      {userData ? (
        <>
          <div className={style['profile_container-informations']}>
            <div className={style['profile_container-informations-item']}>
              <h3>Pseudo</h3>
              <h4>{userData.username}</h4>
            </div>
            <div className={style['profile_container-informations-item']}>
              <h3>Email</h3>
              <h4>{user?.email}</h4>
            </div>
            <div className={style['profile_container-informations-item']}>
              <h3>Temps de travail</h3>
              <h4>15h34min</h4>
            </div>
            <div className={style['profile_container-informations-item']}>
              <h3>Pomodoro Effectué</h3>
              <h4>5</h4>
            </div>
            <div className={style['profile_container-report-circle']}>
              <ReportCircle />
            </div>
          </div>
        </>
      ) : null}
    </div>
    </>
  );
};

export default Profile;
