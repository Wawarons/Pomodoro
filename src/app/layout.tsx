import "./globals.css";
import React from "react";
import type { Metadata } from "next";
import { TimerProvider } from "@/app/TimerContext";

export const metadata: Metadata = {
  title: "Pomodoro",
  description: "Pomodoro timer | Be more productive.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TimerProvider>{children}</TimerProvider>
      </body>
    </html>
  );
}
