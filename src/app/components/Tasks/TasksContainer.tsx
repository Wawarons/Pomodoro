import React, { useState, useEffect, useCallback, FormEvent } from "react";
import Image from "next/image";
import TaskItem from "./TaskItem";
import { fetchData } from "../utilities/FetchData";
import { userAuth } from "@/app/context/Authcontext";
import { FetchOptions, Task } from "@/app/type";
import {
  TbDots,
  TbPlaystationX,
  TbSquareCheckFilled,
  TbWashDry,
} from "react-icons/tb";
import style from "./tasks.module.css";
import { optionsFetch } from "../utilities/OptionsFetch";

/**
 * Container who contains all the tasks
 * @returns JSX Element
 */
const TasksContainer = () => {
  //Liste des tâches
  const [taskslist, setTasksList] = useState<Array<Task> | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = userAuth();

  const compareTasks = (taskA: Task, taskB: Task) => {
    if (taskA.status !== undefined && taskB.status !== undefined) {
      if (taskA.status > taskB.status) {
        return 1;
      } else if (taskA.status < taskB.status) {
        return -1;
      }
    }
    return 0;
  }

  useEffect(() => {
    if (user && !taskslist) {
      fetchData(`/tasks/${user.uid}`, { method: 'GET' }).then((response) => {
        if (response) {
          setTasksList(response);
        }
      })

    };
    setLoading(false);
  }, [taskslist, user]);


  /**
   * useCallback function for update state of a task
   * @param targetTask @type Task
   */
  const handleChangeStateTask = useCallback(
    async (targetTask: Task) => {
      if (targetTask.status !== undefined) {
        targetTask.status = targetTask.status === 2 ? 0 : targetTask.status + 1;

        if (user) {
          await fetchData(`/update/task/${user.uid}/${targetTask.id}`, optionsFetch('PUT', {t_status: targetTask.status}));
        }
      }

      const newTasksList = taskslist?.filter((task: Task) => {
        return task.id !== targetTask.id
      });

      if (newTasksList)
        setTasksList([...newTasksList, targetTask].sort(compareTasks));
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
        await fetchData(`/delete/task/${user.uid}/${targetTask.id}`, { method: 'DELETE' });
        let newTasksList = taskslist?.filter(
          (task) => task.id !== targetTask.id
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
        id: taskslist ? taskslist.length + 1 : 0
      };

      if (user) {
        await fetchData(`/add/task/${user.uid}`, optionsFetch('POST', newTask));
      }

      if (newTask && taskslist) setTasksList([newTask, ...taskslist]);
      taskInput.value = "";
    },
    [taskslist]
  );

  const iterateTaskList = useCallback((taskslist: Array<Task>) => {
    //Sort tasks list
    return taskslist.map((task: Task, index: number) => {
      return (
        // Task
        <div className={style.task} key={`task_${index}`}>
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
          <div>

            <TaskItem name={task.title} state={task.status ? task.status : 0} id={task.id ? task.id : null} />

          </div>
        </div>
      );
    });
  }, [taskslist]);

  return (
    <div className={style["tasks-container"]}>
      <h3 className={style["tasks-container__header--title"]}>Tasks</h3>
      {taskslist?.length ? (
        iterateTaskList(taskslist)
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
      <form onSubmit={handleAddTask} className={style['tasks-container__form']}>
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
