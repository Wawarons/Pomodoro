'use client'
import {createContext, ReactNode, useState} from "react";
import {TimerOptions} from "@/app/type";

export const TimeContext = createContext<{timer: TimerOptions, updateTimer: (newValue: Partial<TimerOptions>) => void} | undefined>(undefined);

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

    const updateTimer = (newValue: Partial<TimerOptions>) => {
        setTimer({...timer, ...newValue});
    };



    return (
        <TimeContext.Provider value={{timer, updateTimer}}>
            {children}
        </TimeContext.Provider>
    );
}
