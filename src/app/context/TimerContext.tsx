'use client'
import { createContext, ReactNode, useState, useEffect } from "react";
import { fetchData } from "../components/utilities/FetchData";
import { userAuth } from "./Authcontext";
import { Category, TimerOptions } from "@/app/type";

type timerOptionsData = {
  work_time: number;
  short_break_time: number;
  long_break_time: number;
  session_goal: number;
}

//Create context for handle timer state 
export const TimeContext = createContext<{ timer: TimerOptions, updateTimer: (newValue: Partial<TimerOptions>) => void } | undefined>(undefined);

/**
 * 
 * @param children @type ReactNode 
 * @returns 
 */
export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const { user } = userAuth();
  const [timer, setTimer] = useState<TimerOptions>({
    title_category: 'Work',
    category_id: 1,
    actualTime: 25,
    workTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
    sessionGoal: 4,
    sessionDo: 0,
    isBreak: true,
    sessionStart: false,
    stepSession: 'work'
  });

  useEffect(() => {
    const getData = async () => {
      const categories: Array<Category> = await fetchData(`/category/${user?.uid}`, { method: 'GET' });
      if (categories && categories[0]) {
        const timerOptions: Array<timerOptionsData> = await fetchData(`/pomodoro/${user?.uid}/${categories[0].id}`, { method: 'GET' });
        if (timerOptions && timerOptions[0]) {
          updateTimer({
            title_category: categories[0].title,
            category_id: categories[0].id,
            actualTime: timerOptions[0].work_time,
            workTime: timerOptions[0].work_time,
            shortBreakTime: timerOptions[0].short_break_time,
            longBreakTime: timerOptions[0].long_break_time,
            sessionGoal: timerOptions[0].session_goal
          })
        }
      }
    }
    if (user) getData();
    // else if(!user) setTimer(defaultTimerParameters)
  }, [user])

  /**
   * Update the timer with the new values
   * @param newValue New values
   * @type Partial<TimerOptions>
   * 
   */
  const updateTimer = (newValue: Partial<TimerOptions>) => {
    if(timer){
      setTimer({ ...timer, ...newValue });
    }

  };



  return (
    <TimeContext.Provider value={{ timer, updateTimer }}>{children}</TimeContext.Provider>
  );
}
