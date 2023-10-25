import React, { useEffect, useState } from "react";
import style from "@/app/styles/tasks.module.css";
import {
  TbPlaystationX,
  TbSquareCheckFilled,
  TbWashDry,
  TbDots,
} from "react-icons/tb";

interface TaskProps {
  name: string;
  state: "to do" | "pending" | "done";
  id: number;
}

type Task = {
  name: string;
  state: "to do" | "pending" | "done";
  priority: number;
  id: number;
};

const Task: React.FC<TaskProps> = ({ name, state, id }) => {
  const [stateTask, setStateTask] = useState(state);

  const handleChangeState = () => {
    if (localStorage.getItem("tasks") !== null) {
      let tasksLocalStorage = localStorage.getItem("tasks") as string;
      let tasks: Array<Task> = JSON.parse(tasksLocalStorage);
      tasks.forEach((task: Task) => {
        if (task.id === id) {
          if (task.state === "to do") {
            task.state = "pending";
          } else if (task.state === "pending") {
            task.state = "done";
          } else {
            task.state = "to do";
          }
          setStateTask(task.state);
        }
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  };

  const handleDeleteTask = () => {
    if (localStorage.getItem("tasks") !== null) {
        let tasksLocalStorage = localStorage.getItem("tasks") as string;
        let tasks: Array<Task> = JSON.parse(tasksLocalStorage);
        tasks = tasks.filter((task: Task) => {return task.id !== id});
        document.querySelector(`#task_${id}`)?.classList.add('hidden');
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
      console.log(JSON.parse(localStorage.getItem('tasks')));
  }

  return (
    <div className={style.task} id={`task_${id}`}>
      <div className={style["task__state"]}>
        <TbPlaystationX onClick={handleDeleteTask}/>
        <div onClick={handleChangeState}>
          {stateTask === "to do" ? (
            <TbWashDry />
          ) : stateTask === "pending" ? (
            <TbDots />
          ) : (
            <TbSquareCheckFilled />
          )}
        </div>
      </div>
      <p className={`${style["task__name"]} ${style[stateTask]}`}>{name}</p>
    </div>
  );
};

export default Task;
