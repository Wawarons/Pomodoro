"use client";
import Timer from "@/app/components/Timer/Timer";
import React, { useContext } from "react";
import GoalSession from "@/app/components/Timer/goal_session/GoalSession";
import OptionsTimer from "@/app/components/Timer/sliders/OptionsTimer";
import ButtonsTimer from "@/app/components/Timer/buttons/ButtonsTimer";
import TasksContainer from "@/app/components/Tasks/TasksContainer";
import { TimeContext } from "@/app/context/TimerContext";
import NavBar from "./components/navbar/NavBar";

/**
 * Home page 
 * @returns JSX Elements
 */
export default function Home() {
  const context = useContext(TimeContext);
  if (!context)
    throw new Error("ShowTimeComponent must be used within Provider");
  const { timer } = context;
  
  

  return (
    <>
    <NavBar/>
      <div className="home-timer-container">
        <div className="home-timer-container__timer-container">
          <Timer />
          <GoalSession />
          {!timer.sessionStart ? <OptionsTimer /> : null}
          <ButtonsTimer />
        </div>
          <TasksContainer />
      </div>
      </>
  );
}
