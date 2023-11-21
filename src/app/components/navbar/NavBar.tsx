"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { userAuth } from "@/app/context/Authcontext";
import { VscAccount } from "react-icons/vsc";
import style from "./navbar.module.css";

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
              <Link className={style.links_nav} href="/about">
                Flashcards
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
