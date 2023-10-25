import React, {LegacyRef, ReactNode, useCallback, useContext, useRef} from 'react';
import style from '@/app/styles/buttonsTimer.module.css';
import {BsFillPauseFill, BsPlayFill} from 'react-icons/bs';
import {TimeContext} from "@/app/TimerContext";
import {IoIosSquare} from "react-icons/io";

const ButtonsTimer = () => {
    const context = useContext(TimeContext);
    if (!context)
        throw new Error('ShowTimeComponent must be used within Provider');
    const {timer, updateTimer} = context;
    const confirmDiv = useRef<HTMLDivElement | null>(null);
    const handleClick = useCallback((reset: boolean) => {
        if (reset) {
            updateTimer({stepSession: 'work', sessionStart: false, isBreak: true, sessionDo: 0});
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