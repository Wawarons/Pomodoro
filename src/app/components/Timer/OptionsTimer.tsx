import React, {useContext} from 'react';
import style from '../../styles/custom-sliders.module.css';
import {PiBookOpenTextLight, PiCoffeeLight} from 'react-icons/pi';
import {SiBuymeacoffee} from 'react-icons/si';
import {TimeContext} from "@/app/TimerContext";

/**
 * slides bar for set up options timer.
 *  - Work time
 *  - Short break time
 *  - Long break    
 * @returns JSX Elements
 */
const OptionsTimer = () => {

    const context = useContext(TimeContext);

    if(!context)
        throw new Error('ShowTimeComponent must be used within Provider');

    const {timer, updateTimer} = context;

    /**
     * Handle the change event and set up the new value to the timer
     * @param event @type ChangeEvent
     */
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        switch ((event.target.name)) {
            case 'work_time_option':
                updateTimer({workTime: parseInt(event.target.value)})
                break;
            case 'short_break_time_option':
                updateTimer({shortBreakTime: parseInt(event.target.value)})
                break;
            case 'long_break_time_option':
                updateTimer({longBreakTime: parseInt(event.target.value)})
                break;
            default:
                updateTimer({
                    workTime: 25,
                    shortBreakTime: 5,
                    longBreakTime: 15
                })
                break;
        }
    }


    return (
        <div className={style['options-container']}>
            <label className={style.label} htmlFor="work_time_option">
                <PiBookOpenTextLight className={style.icons}/>  {timer.workTime}
            </label>
            <input className={style['custom-slider']} type="range" name="work_time_option" min={5} max={60} defaultValue="25" onChange={handleChange}/>

            <label className={style.label} htmlFor="short_break_time_option">
                <PiCoffeeLight className={style.icons}/> {timer.shortBreakTime}
            </label>
            <input className={style['custom-slider']} type="range" name="short_break_time_option" min={5} max={60} defaultValue="5" onChange={handleChange}/>

            <label className={style.label} htmlFor="long_break_time_option">
                <SiBuymeacoffee className={style.icons}/> {timer.longBreakTime}
            </label>
            <input className={style['custom-slider']} type="range" name="long_break_time_option" min={5} max={60} defaultValue="15" onChange={handleChange}/>
        </div>
    );
};

export default OptionsTimer;