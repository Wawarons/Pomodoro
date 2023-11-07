'use client'
import {createContext, ReactNode, useState} from "react";
import {TimerOptions} from "@/app/type";

//Create context for handle timer state 
export const TimeContext = createContext<{timer: TimerOptions, updateTimer: (newValue: Partial<TimerOptions>) => void} | undefined>(undefined);

/**
 * 
 * @param children @type ReactNode 
 * @returns 
 */
export const TimerProvider = ({children}: {children: ReactNode}) => {
    const [timer, setTimer] = useState<TimerOptions>({
        title: 'Title',
        workTime: 0.05,
        shortBreakTime: 0.05,
        longBreakTime: 15,
        sessionGoal: 4,
        sessionDo: 0,
        isBreak: true,
        sessionStart: false,
        stepSession: 'work'
    });

    /**
     * Update the timer with the new values
     * @param newValue New values
     * @type Partial<TimerOptions>
     * 
     */
    const updateTimer = (newValue: Partial<TimerOptions>) => {
        setTimer({...timer, ...newValue});
    };



    return (
        <TimeContext.Provider value={{timer, updateTimer}}>
            {children}
        </TimeContext.Provider>
    );
}
