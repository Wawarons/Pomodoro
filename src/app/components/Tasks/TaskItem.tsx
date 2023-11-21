'use client'
import React, { useRef } from 'react'
import style from './tasks.module.css'

interface TaskProps {
  state: number,
  name: string,
  id: number | null
}

/**
 * Task component
 * @returns JSX Elements
 */
const TaskItem: React.FC<TaskProps> = ({ name, state, id }) => {
  const taskRef = useRef<HTMLDivElement>(null);


  return (
      <div ref={taskRef} className={style.task}>
          <h4 className={`${style['task__name']} ${state === 2 ? style.done : ''}`}>{name}</h4>
      </div>
  )
}

export default TaskItem;