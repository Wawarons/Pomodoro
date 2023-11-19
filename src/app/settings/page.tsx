'use client'
import React from "react";
import { userAuth } from "../context/Authcontext";

const Settings = () => {
    const {logOut} = userAuth();

  /**
   * Handle log out
   */
  const handleSingOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return <div onClick={handleSingOut}>Log out</div>;
};

export default Settings;
