import React, {useCallback, useContext, useRef} from 'react';
import {TimeContext} from "@/app/context/TimerContext";
import {IoIosSquare} from "react-icons/io";
import {BsFillPauseFill, BsPlayFill} from 'react-icons/bs';
import style from './buttonsTimer.module.css';

/**
 * Buttons for the timers Start/Stop/Reset 
 * @returns JSX Elements
 */
const ButtonsTimer = () => {
    const context = useContext(TimeContext);
    if (!context)
        throw new Error('ShowTimeComponent must be used within Provider');
    const {timer, updateTimer} = context;
    const confirmDiv = useRef<HTMLDivElement | null>(null);
    
    //Reset the timer 
    const handleClick = useCallback((reset: boolean) => {
        if (reset) {
            updateTimer({
                stepSession: 'work',
                sessionStart: false,
                isBreak: true,
                sessionDo: 0
            });
        }
        confirmDiv.current?.classList.add('hidden');
    }, []);

    return (
        <div className={style.buttons}>
            <div className={style['buttons__button']}
                 onClick={() => updateTimer({isBreak: !timer.isBreak, sessionStart: true})}>
                {timer.isBreak ? <BsPlayFill/> : <BsFillPauseFill/>}
            </div>
            {timer.sessionStart ?
                <div className={style['buttons__button']} onClick={() => {
                    (confirmDiv.current as HTMLDivElement).classList.remove('hidden');
                    updateTimer({isBreak: true});
                }}>
                    <IoIosSquare/>
                </div> : null
            }
            <div className={`${style['buttons__confirm--div']} hidden`} ref={confirmDiv}>
                <h3>Confirm</h3>
                <p>All the sessions did will be deleted</p>
                <div>
                    <p onClick={() => handleClick(true)}>Oui</p>
                    <p onClick={() => handleClick(false)}>Non</p>
                </div>
            </div>
        </div>
    );
};

export default ButtonsTimer;