'use client'
import React, { useContext } from 'react';
import { TimeContext } from "@/app/context/TimerContext";
import { fetchData } from '../../utilities/FetchData';
import { userAuth } from '@/app/context/Authcontext';
import SelectCategorySession from './SelectCategorySession';
import { GoGoal, GoCheckCircleFill } from 'react-icons/go';
import style from './goal-session.module.css';

/*
* Render the component for set up goal's session.
* | Set a title
* | Choose numbers of sessions for goal.
* @return JSX Elements
 */
const GoalSession = () => {
    const context = useContext(TimeContext);
    if (!context)
        throw new Error('ShowTimeComponent must be used within Provider');
    const { timer, updateTimer } = context;
    const { user } = userAuth();

    const handleChangeGoalSession = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (isNaN(parseInt(event.target.value))) { event.target.value = '4' }
        let value: number = parseInt(event.target.value);
        updateTimer({
            sessionGoal: value
        });

        const options = {
            method: 'PUT',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                session_goal: value
            })
        }
        await fetchData(`/update/pomodoro/${user?.uid}/${timer.category_id}`, options);
    }

    return (
        <div className={style['goal-session-container']}>
            <SelectCategorySession />
            <div className={style['goal-session-container__setup-container']}>
                <div className={style['container-options']}>
                    <GoCheckCircleFill className={style.icons} />
                    <p className={style.options}>{timer.sessionDo}</p>
                </div>
                <div className={style['container-options']}>
                    <GoGoal className={style.icons} />
                    <input type="text" defaultValue={timer.sessionGoal} maxLength={2} className={style.options} name="session-goal" id="session-goal" onBlur={handleChangeGoalSession} disabled={timer.sessionStart} />
                </div>
            </div>
        </div>
    );
};

export default GoalSession;