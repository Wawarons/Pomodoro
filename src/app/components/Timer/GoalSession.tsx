'use client'
import React, {useContext} from 'react';
import style from '../../styles/goal-session.module.css';
import {GoGoal, GoCheckCircleFill} from 'react-icons/go';
import {TimeContext} from "@/app/TimerContext";

/*
* Render the component for set up goal's session.
* | Set a title
* | Choose numbers of sessions for goal.
* @return JSX Elements
 */
const GoalSession = () => {
    const context = useContext(TimeContext);
    if(!context)
        throw new Error('ShowTimeComponent must be used within Provider');
    const {timer, updateTimer} = context;


    return (
        <div className={style['goal-session-container']}>
            <input type="text" defaultValue="Title" name="title-session" id={style['title-session']} maxLength={20} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateTimer({title: e.target.value})} disabled={timer.sessionStart}/>
            <div className={style['goal-session-container__setup-container']}>
                <div className={style['container-options']}>
                    <GoCheckCircleFill className={style.icons}/>
                    <p className={style.options}>{timer.sessionDo}</p>
                </div>
                <div className={style['container-options']}>
                    <GoGoal className={style.icons}/>
                    <input type="text" defaultValue={timer.sessionGoal} maxLength={2} className={style.options} name="session-goal" id="session-goal" onBlur={(e : React.ChangeEvent<HTMLInputElement>)=> {
                        if(isNaN(parseInt(e.target.value)))
                            e.target.value = '4';
                        let value: number = parseInt(e.target.value);
                        updateTimer({
                            sessionGoal: value
                        });
                    }} disabled={timer.sessionStart}/>
                </div>
            </div>
        </div>
    );
};

export default GoalSession;