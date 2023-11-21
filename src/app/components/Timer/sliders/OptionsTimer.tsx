import React, { useContext } from 'react';
import { FetchOptions } from '@/app/type';
import { TimeContext } from "@/app/context/TimerContext";
import { fetchData } from '../../utilities/FetchData';
import { userAuth } from '@/app/context/Authcontext';
import { SiBuymeacoffee } from 'react-icons/si';
import { PiBookOpenTextLight, PiCoffeeLight } from 'react-icons/pi';
import style from './custom-sliders.module.css';

/**
 * slides bar for set up options timer.
 *  - Work time
 *  - Short break time
 *  - Long break    
 * @returns JSX Elements
 */
const OptionsTimer = () => {
    const { user } = userAuth();
    const context = useContext(TimeContext);

    if (!context)
        throw new Error('ShowTimeComponent must be used within Provider');

    const { timer, updateTimer } = context;

    const handleUpdateTimer = async (event: React.MouseEvent<HTMLInputElement>) => {
        const inputTarget = (event.target as HTMLInputElement);
        const options: FetchOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        }
        
        switch (inputTarget.name) {
            case 'work_time_option':
                await fetchData(`/update/pomodoro/${user?.uid}/${timer.category_id}`, { ...options, body: JSON.stringify({ p_work_time: inputTarget.value }) });
                break;
            case 'short_break_time_option':
                await fetchData(`/update/pomodoro/${user?.uid}/${timer.category_id}`, { ...options, body: JSON.stringify({ p_short_break_time: inputTarget.value }) })
                break;
            case 'long_break_time_option':
                await fetchData(`/update/pomodoro/${user?.uid}/${timer.category_id}`, { ...options, body: JSON.stringify({ p_long_break_time: inputTarget.value }) });
                break;
        }
    }

    /**
     * Handle the change event and set up the new value to the timer
     * @param event @type ChangeEvent
     */
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newTime = parseInt(event.target.value);

        switch ((event.target.name)) {
            case 'work_time_option':
                updateTimer({ workTime: newTime, actualTime: newTime })
                break;
            case 'short_break_time_option':
                updateTimer({ shortBreakTime: newTime, actualTime: newTime })
                break;
            case 'long_break_time_option':
                updateTimer({ longBreakTime: newTime, actualTime: newTime })
                break;
            default:
                updateTimer({
                    actualTime: timer.actualTime,
                    workTime: timer.workTime,
                    shortBreakTime: timer.shortBreakTime,
                    longBreakTime: timer.longBreakTime
                })
                break;
        }
    }


    return (
        <div className={style['options-container']}>
            <label className={style.label} htmlFor="work_time_option">
                <PiBookOpenTextLight className={style.icons} />  {timer.workTime}
            </label>
            <input className={style['custom-slider']} type="range" name="work_time_option" min={5} max={60} defaultValue={timer.workTime} onChange={handleChange} onMouseUp={handleUpdateTimer} />

            <label className={style.label} htmlFor="short_break_time_option">
                <PiCoffeeLight className={style.icons} /> {timer.shortBreakTime}
            </label>
            <input className={style['custom-slider']} type="range" name="short_break_time_option" min={5} max={60} defaultValue={timer.shortBreakTime} onChange={handleChange} onMouseUp={handleUpdateTimer} />

            <label className={style.label} htmlFor="long_break_time_option">
                <SiBuymeacoffee className={style.icons} /> {timer.longBreakTime}
            </label>
            <input className={style['custom-slider']} type="range" name="long_break_time_option" min={5} max={60} defaultValue={timer.longBreakTime} onChange={handleChange} onMouseUp={handleUpdateTimer} />
        </div>
    );
};

export default OptionsTimer;