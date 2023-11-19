'use client'
import React, { useEffect, useRef, useState } from 'react'
import style from '@/app/styles/tasks.module.css'
import { userAuth } from '@/app/context/Authcontext'
import ClickOutside from '../utilities/ClickOutside'

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