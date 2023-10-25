'use client'
import Timer from "@/app/components/Timer/Timer";
import React, {useContext, useState} from "react";
import GoalSession from "@/app/components/Timer/GoalSession";
import OptionsTimer from "@/app/components/Timer/OptionsTimer";
import ButtonsTimer from '@/app/components/Timer/ButtonsTimer';
import {TimeContext} from "@/app/TimerContext";
import TasksContainer from "@/app/components/Tasks/TasksContainer";
import MusicComponent from "./components/Music/MusicComponent";

export default function Home() {
    const context = useContext(TimeContext);
    if (!context)
        throw new Error('ShowTimeComponent must be used within Provider');
    const {timer, updateTimer} = context;

    return (
        <>
            <h1 id="title_site">Pomodoro</h1>
            <div className='home-timer-container'>
                <div className='home-timer-container__timer-container'>
                    <Timer/>
                    <GoalSession/>
                    {!timer.sessionStart ? <OptionsTimer/> : null}
                    <ButtonsTimer/>
                </div>
                <TasksContainer/>
                <MusicComponent/>
            </div>
        </>
    )
}
