import React from "react";
import Head from "next/head";
import type { Metadata } from "next";
import { TimerProvider } from "@/app/context/TimerContext";
import { AuthContextProvider } from "@/app/context/Authcontext";
import "./globals.css";

/**
 * Metadata attributs
 */
export const metadata: Metadata = {
  title: "PomoFox 🦊",
  description: "Pomodoro timer | Be more productive.",
};

/**
 * @param children ReactNode 
 * @returns JSX Elements
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <Head>
        <link rel="icon" href="/icon.ico" />
      </Head>
      <body>
        <AuthContextProvider>
          <div className="bg-blur"></div>
        <TimerProvider>{children}</TimerProvider>
        {/* <footer>
          <p className="footer-copyright">&copy; Adrien Podsiadly | 2023</p>
          <div className="footer-documents">
            <p>Mentions Légales</p>
            <p>Plan du site</p>
          </div>
        </footer> */}
        </AuthContextProvider>
      </body>
      
    </html>
  );
}
