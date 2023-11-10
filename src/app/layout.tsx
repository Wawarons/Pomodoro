import "./globals.css";
import NavBar from "@/app/components/NavBar";
import React from "react";
import type { Metadata } from "next";
import { TimerProvider } from "@/app/context/TimerContext";
import { AuthContextProvider } from "@/app/context/Authcontext";

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
      <body>
        <AuthContextProvider>
        <NavBar/>
        <TimerProvider>{children}</TimerProvider>
        <footer>
          <p className="footer-copyright">&copy; Adrien Podsiadly | 2023</p>
          <div className="footer-documents">
            <p>Mentions Légales</p>
            <p>Plan du site</p>
            <p>Contact</p>
          </div>
        </footer>
        </AuthContextProvider>
      </body>
      
    </html>
  );
}
