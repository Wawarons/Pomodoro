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
import { userAuth } from "@/app/context/Authcontext";

/**
 * Container who contains all the tasks
 * @returns JSX Element
 */
const TasksContainer = () => {
  //Liste des tâches
  const [taskslist, setTasksList] = useState<Array<Task> | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = userAuth();

  useEffect(() => {
    //Récupération des anciennes tâches
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${user.uid}`
      );
      response.json().then((data) => {
        setTasksList(data);
      });
    };
    if (user) fetchData();
    setLoading(false);
  }, [taskslist, user]);

  /**
   * useCallback function for update state of a task
   * @param targetTask @type Task
   */
  const handleChangeStateTask = useCallback(
    async (targetTask: Task) => {
      targetTask.status = targetTask.status === 2 ? 0 : targetTask.status + 1;
      if (user) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/update/task/${user.uid}/${targetTask.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: targetTask.status }),
          }
        );
      }
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
    async (targetTask: Task) => {
      if (user) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/remove/task/${user.uid}/${targetTask.id}`,
          { method: "PUT" }
        );
        let newTasksList = taskslist?.filter(
          (task) => task.id != targetTask.id
        );
        if (newTasksList) {
          setTasksList(newTasksList);
        }
      }
    },
    [taskslist]
  );

  /**
   * Add new task
   * @param targetTask @type Task
   */
  const handleAddTask = useCallback(
    async (formEvent: FormEvent) => {
      formEvent.preventDefault();
      let taskInput: HTMLInputElement = (formEvent.target as HTMLFormElement)
        .task;
      let newTask: Task = {
        title: taskInput.value ? taskInput.value : "new Task",
        status: 0,
        priority: 0,
        id: 0,
      };

      if (user) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/add/task/${user.uid}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
          }
        );
      }

      if (newTask && taskslist) setTasksList([...taskslist, newTask]);
      taskInput.value = "";
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
            return taskA.priority < taskB.priority ||
              taskA.status < taskB.status
              ? -1
              : 1;
          })
          .map((task: Task, index: number) => {
            return (
              // Task
              <div className={style.task} key={`task_${task.id}`}>
                <div>
                  <div
                    className={style["task__delete"]}
                    onClick={() => handleDeleteTask(task)}
                  >
                    <TbPlaystationX />
                  </div>
                  <div onClick={() => handleChangeStateTask(task)}>
                    {task.status === 0 ? (
                      <TbWashDry />
                    ) : task.status === 1 ? (
                      <TbDots />
                    ) : (
                      <TbSquareCheckFilled />
                    )}
                  </div>
                </div>
                <TaskItem name={task.title} state={task.status} />
              </div>
            );
          })
      ) : (
        //If no tasks
        <div id={`${style["fox_pen"]}`}>
          {loading ? (
            <Image src="Loader.svg" alt="loader" width={50} height={50} />
          ) : (
            <>
              <Image
                src="/images/fox_tomato_no_bg.webp"
                alt="fox with pen"
                width={150}
                height={150}
                priority
              />
              <h4>Push some tasks here</h4>
            </>
          )}
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
