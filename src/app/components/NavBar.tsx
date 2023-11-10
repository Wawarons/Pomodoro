"use client";
import React, { useState, useEffect } from "react";
import style from "@/app/styles/navbar.module.css";
import Link from "next/link";
import { userAuth } from "../context/Authcontext";

/**
 * Navbar component
 * @returns JSX Elements
 */
function NavBar() {
  const { user, logOut } = userAuth();
  const [loading, setLoading] = useState(true);
    
  
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
  

  useEffect(() => {
    const checkAuthUser = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    }
    checkAuthUser();
  }, [user])

  return (
    <nav className={style.navbar}>
      <h1 id="title_site">Pomodoro</h1>

      <ul className={style.navbar__list}>
        <li>
          <Link className={style.links_nav} href="/">
            Home
          </Link>
        </li>
          {user ? 
          <><li>
            <Link className={style.links_nav} href="/profile">
              Profile
            </Link>
            </li>
            <li>
            <Link className={style.links_nav} href="/Reports">
              Report
            </Link>
            </li>
            </>:null
          }
        <li>
          <Link className={style.links_nav} href="/about">
            About
          </Link>
        </li>
      </ul>
      <ul className={style.navbar__list}>
      {loading ? null:!user ? (
        <>
          <li className={style.links__logs}>
            <Link className={style.links_nav} href="/login">Sign in/Sign up</Link>
          </li>
          </>
      ) : (
          <li
            onClick={handleSingOut}
            className={style.links__logs}
          >
            Log out
          </li>
      )}
        </ul>
    </nav>
  );
}

export default NavBar;
