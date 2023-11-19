"use client";
import React, { useState, useEffect } from "react";
import style from "@/app/styles/navbar.module.css";
import Link from "next/link";
import { userAuth } from "../context/Authcontext";
import { VscAccount, VscSettingsGear } from "react-icons/vsc";

/**
 * Navbar component
 * @returns JSX Elements
 */
function NavBar() {
  const { user } = userAuth();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const checkAuthUser = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthUser();
  }, [user]);

  return (
    <nav className={style.navbar}>
        <h1 className={`${style.navbar__title} ${style.navbar__div}`}>
          Pomo<span style={{ color: "orange" }}>Fox</span>
        </h1>

        {/* ========================minimum 750px==================================== */}

      <div className={style.navbar_container}>
        <div className={style.navbar__div}>
          <div className={style.navbar__list} id={style.navbar__list_1}>
              <Link className={style.links_nav} href="/">
                Home
              </Link>
            {user ? (
                  <Link className={style.links_nav} href="/Reports">
                    Report
                  </Link>
            ) : null}
              <Link className={style.links_nav} href="/about">
                About
              </Link>
          </div>
        </div>


        <div className={style.navbar__div}>
          <div className={style.navbar__list} id={style.navbar__profile}>
              <Link
                className={style.links_nav}
                href={user ? "/profile" : "/login"}
                title={user ? "profile" : "Sign in"}
              >
                <VscAccount />
              </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
