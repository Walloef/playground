import Link from "next/link";
import React from "react";
import style from "./layoutStyle.module.scss";
import { useAuth } from "../../../src/providers/AuthUserContext";

export default function Layout({ children }) {
  const { authUser, logOut } = useAuth();
  console.log(authUser);
  return (
    <>
      <div className={style.header}>
        <nav className={style.nav}>
          <Link href="/">
            <a>
              <h1>Hi!</h1>
            </a>
          </Link>
          <Link href="/italiano">
            <a>Italiano</a>
          </Link>
          {authUser === null ? (
            <>
              <Link href="/sign-in">
                <a>Sign in</a>
              </Link>
              <Link href="/sign-up">
                <a>Sign up</a>
              </Link>
            </>
          ) : (
            <button type="button" onClick={logOut}>
              Sign out
            </button>
          )}
        </nav>
      </div>
      <main className={style.main}>{children}</main>
    </>
  );
}
