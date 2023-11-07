import React, { useState, useEffect, useCallback, FormEvent } from "react";
import style from "@/app/styles/tasks.module.css";
import { Task } from "@/app/type";
import TaskItem from "./TaskItem";
import Image from "next/image";
import {
  TbDots,
  TbPlaystationX,
  TbSquareCheckFilled,
  TbWashDry,
} from "react-icons/tb";

/**
 * Container who contains all the tasks
 * @returns JSX Element
 */
const TasksContainer = () => {
  //Liste des tâches
  const [taskslist, setTasksList] = useState<Array<Task> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Récupération des anciennes tâches
    let localStorageTasks: string | null = window.localStorage.getItem("tasks");
    //Si anciennes tâches
    if (localStorageTasks && !taskslist) {
      //Parsé les anciennes tâches
      const localStorageTasksParsed: Array<Task> =
        JSON.parse(localStorageTasks);
      //Si parsé ajouté à task
      localStorageTasksParsed ? setTasksList(localStorageTasksParsed) : setTasksList([]);
      setLoading(false);
    } else {
      //Update the localStorage with the new values
      window.localStorage.setItem("tasks", JSON.stringify(taskslist));
    }
  }, [taskslist]);

  /**
   * useCallback function for update state of a task
   * @param targetTask @type Task
   */
  const handleChangeStateTask = useCallback(
    (targetTask: Task) => {
      targetTask.state = targetTask.state === 2 ? 0 : targetTask.state + 1;
      let newTasksList = taskslist?.filter((task) => task.id != targetTask.id);
      newTasksList ? setTasksList([...newTasksList, targetTask]) : null;
    },
    [taskslist]
  );

  /**
   * useCallback function for delete a task
   * @param targetTask @type Task
   */
  const handleDeleteTask = useCallback(
    (targetTask: Task) => {
      let newTasksList = taskslist?.filter((task) => task.id != targetTask.id);
      if (newTasksList) {
        !newTasksList.length ? window.localStorage.removeItem("tasks") : null;
        setTasksList(newTasksList);
      }
    },
    [taskslist]
  );

  /**
   * Add new task
   * @param targetTask @type Task
   */
  const handleAddTask = useCallback(
    (formEvent: FormEvent) => {
      formEvent.preventDefault();
      let taskInput: HTMLInputElement = (formEvent.target as HTMLFormElement).task;
      let newTask: Task = {
        name: taskInput.value ? taskInput.value : "new Task",
        state: 0,
        priority: 0,
        id: taskslist ? taskslist?.length + 1 : 0,
      };
      if (newTask && taskslist) setTasksList([...taskslist, newTask]);
      taskInput.value = '';
    },
    [taskslist]
  );

  return (
    <div className={style["tasks-container"]}>
      <h3 className={style["tasks-container__header--title"]}>Tasks</h3>
      {taskslist?.length ? (
        taskslist
        //Sort tasks list
          .sort((taskA, taskB) => {
            return taskA.priority < taskB.priority || taskA.state < taskB.state
              ? -1
              : 1;
          })
          .map((task: Task, index: number) => {
            return (
                // Task
              <div className={style.task} key={`task_${task.id}`}>
                <div>
                  <div className={style["task__delete"]} onClick={() => handleDeleteTask(task)}>
                    <TbPlaystationX />
                  </div>
                  <div onClick={() => handleChangeStateTask(task)}>
                    {task.state === 0 ? (
                      <TbWashDry />
                    ) : task.state === 1 ? (
                      <TbDots />
                    ) : (
                      <TbSquareCheckFilled />
                    )}
                  </div>
                </div>
                <TaskItem name={task.name} state={task.state} />
              </div>
            );
          })
      ) : (
        //If no tasks
        <div id={`${style["fox_pen"]}`}>
          {loading ?
          <Image src="Loader.svg" alt="loader" width={50} height={50} />:
          <>
          <Image
            src="/images/fox_tomato_no_bg.webp"
            alt="fox with pen"
            width={150}
            height={150}
          />
          <h4>Push some tasks here</h4>
          </>
          }

        </div>
      )}
      {/* Form for add a new task */}
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          name="task"
          id=""
          className={style["tasks-container__input--task"]}
        />
        <input
          type="submit"
          value="add"
          className={style["tasks-container__input-btn"]}
          disabled={taskslist === null}
        />
      </form>
    </div>
  );
};

export default TasksContainer;
