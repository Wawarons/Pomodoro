import React from 'react'
import style from '@/app/styles/tasks.module.css'

interface TaskProps {
    state: number,
    name: string
}

/**
 * Task component
 * @returns JSX Elements
 */
const TaskItem: React.FC<TaskProps> = ({name, state}) => {
  return (
    <div className={style.task}>
        <h4 className={`${style['task__name']} ${state === 2 ? style.done:''}`}>{name}</h4>
    </div>
  )
}

export default TaskItem;