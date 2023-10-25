import React from 'react';
import style from '@/app/styles/tasks.module.css';
import {TbSquareCheck, TbSquareCheckFilled, TbWashDry} from "react-icons/tb";

interface TaskProps {
    name: string,
    state: 'to do' | 'pending' | 'done',
}
const Task: React.FC<TaskProps> = ({name, state}) => {
    return (
        <div className={style.task}>
            <div className={style['task__state']}>
                {state === 'to do' ?
                    <TbWashDry/>: state === 'pending' ? <TbSquareCheck/>:<TbSquareCheckFilled/>}
            </div>
            <p className={`${style['task__name']} ${style[state]}`}>{name}</p>
        </div>
    );
};

export default Task;