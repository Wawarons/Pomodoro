import React, {FormEvent, useEffect, useRef, useState} from 'react';
import style from '@/app/styles/tasks.module.css'
import Task from "@/app/components/Tasks/Task";

type Task = {
    name: string,
    state: 'to do' | 'pending' | 'done',
    priority: number,
    id: number
}

const TasksContainer = () => {

    const localTasks = localStorage.getItem('tasks');
    const [tasks, setTasks] = useState<Array<Task>>(localTasks ? JSON.parse(localTasks):[]);
    const errorTaskMessage = useRef<HTMLParagraphElement>(null);

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();
        let form : HTMLFormElement = (e.target as HTMLFormElement);
        let taskName: string = form['input-task'].value;
        if(taskName.length >= 2 && taskName.length <= 150) {
            let newTask: Task;
            newTask = {
                name: taskName,
                state: 'to do',
                priority: 0,
                id: tasks.length ? tasks[tasks.length - 1].id + 1:1
            };
            setTasks([...tasks, newTask]);
            (errorTaskMessage.current as HTMLElement).classList.add('hidden');
            form['input-task'].value = "";
            localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
        }else {
            (errorTaskMessage.current as HTMLElement).classList.remove('hidden');
        }
    }

    function compareTask(taskA : null | Task = null, taskB: null | Task = null) : 1 | -1 {
        if(taskA && taskB){
            if (taskA.state === 'to do' && taskB.state != 'to do')
                return -1;
            else if (taskA.state === 'pending' && taskB.state === 'done')
                return -1;
            else if(taskA.priority < taskB.priority)
                return -1;
            return 1;
        }
        return 1;
    }

    return (
        <div className={style['tasks-container']}>
            <div className={style['tasksContainer__header']}>
                <h2 className={style['tasks-container__header--title']}>Tasks</h2>
            </div>
            <div className={style['tasks-container__task']}>
                {
                    tasks ? tasks.sort((taskA, taskB) => {return compareTask(taskA, taskB)}).map((task, index) => {
                        return <Task name={task.name} state={task.state} key={`task_${index}`}/>
                        })
                        :null
                }
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" pattern='.{3,150}' placeholder="new task" name="input-task" className={style['tasks-container__input--task']}/>
                <p ref={errorTaskMessage} className={`${style['tasks-container__error-task']} hidden`}>Task length must be between 3 & 150 characters.</p>
            </form>
        </div>
    );
};

export default TasksContainer;