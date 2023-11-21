import React, { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { Category } from '@/app/type';
import { TimeContext } from "@/app/context/TimerContext";
import { fetchData } from '../../utilities/FetchData';
import { userAuth } from '@/app/context/Authcontext';
import { GoCheckCircleFill } from 'react-icons/go';
import { TbPlaystationX } from 'react-icons/tb';
import style from './goal-session.module.css'
import { optionsFetch } from '../../utilities/OptionsFetch';


const SelectCategorySession = () => {
    const context = useContext(TimeContext);
    if (!context)
        throw new Error('ShowTimeComponent must be used within Provider');
    const { timer, updateTimer } = context;
    const { user } = userAuth();
    const [showOptions, setShowOptions] = useState(false);
    const [categories, setCategories] = useState<Array<Category> | null>(null);
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        //Récupération des anciennes tâches
        const getData = async () => {
            if (user) {
                const categoryData: Array<Category> = await fetchData(`/category/${user.uid}`, { method: 'GET' });
                setCategories(categoryData);
                updateTimer({
                    title_category: categoryData[0].title,
                    category_id: categoryData[0].id
                });

                setTimeout(() => {
                }, 10000);
            }
        };
        if (user && !categories) getData();

    }, [categories, user]);

    const handleAddCategory = async (event: FormEvent) => {
        event?.preventDefault();
        const newCategoryName = inputRef.current?.value;
        if (categories && newCategoryName && newCategoryName?.length > 0 && categories.length < 5 && user) {

            await fetchData(`/add/category/${user.uid}`, optionsFetch('POST', { title_category: newCategoryName })).then((response) => {
                if (response && response[0]) {
                    const newCategory: Category = {
                        title: newCategoryName,
                        id: response[0].id
                    };

                    setCategories([...categories, newCategory]);

                    inputRef.current?.value ? inputRef.current.value = "" : null;

                    fetchData(`/add/pomodoro/${user.uid}`, optionsFetch('POST', {category_id: response[0].id})).then((response) => {
                        if (response && response[0]) {
                            updateTimer({
                                workTime: response[0].work_time,
                                actualTime: response[0].work_time,
                                shortBreakTime: response[0].short_break_time,
                                longBreakTime: response[0].long_break_time,
                                sessionGoal: response[0].session_goal
                            })
                        }
                    });

                }
            })

        } else {
            //Handle errors
        }
    };

    const handleDeleteCategory = (categoryTarget: Category) => {
        if (categories && categoryTarget && categories.length > 1 && user) {
            fetchData(`/delete/category/${user.uid}/${categoryTarget.id}`, {
                method: 'DELETE'
            }).then((response) => {

                if (response) {
                    let newCategoriesList = categories.filter((category: Category) => category.id !== categoryTarget.id);
                    setCategories(newCategoriesList);

                    if (categories.length === 1 || categoryTarget.id === timer.category_id) {

                        updateTimer({
                            title_category: categories.find((category) => category.id !== categoryTarget.id)?.title,
                            category_id: categories.find((category) => category.id !== categoryTarget.id)?.id
                        });

                    }
                }
            })
        }
    }

    const handleSelectCategory = (categoryID: number, category_title: string) => {
        fetchData(`/pomodoro/${user?.uid}/${categoryID}`, { method: ('GET') }).then((response) => {
            if (response && response[0]) {
                updateTimer({ 
                    title_category: category_title,
                    category_id: categoryID,
                    workTime: response[0].work_time,
                    shortBreakTime: response[0].short_break_time,
                    longBreakTime: response[0].long_break_time,
                    sessionGoal: response[0].session_goal
                 })
            }
        });

        setShowOptions(false);
    }


    return (
        <div>
            <div id={style['title-session']} onClick={() => {
                if (user && !timer.sessionStart)
                    setShowOptions(!showOptions);

            }}>{timer.title_category}</div>
            <div className={`${style['title-session__option-container']} ${style[showOptions && !timer.sessionStart ? 'show_options' : 'hidden_options']}`}>
                {categories && categories.length ?
                    categories.map((category: Category, index: number) => {
                        return (
                            <div key={`${category.id}_${index}`} className={style.category_item} onMouseEnter={() => setShowDeleteButton(true)} onMouseLeave={() => setShowDeleteButton(false)}>
                                <p className={style['title-session__option']} onClick={()=>handleSelectCategory(category.id, category.title)}>{category.title}</p>
                                {
                            showDeleteButton ?
                                <TbPlaystationX className={`${showDeleteButton ? '' : 'hidden'}`} onClick={() => handleDeleteCategory(category)} /> : null
                        }
                            </div>

            )
                    }) : null
                }
            {categories && categories.length < 5 ?
                <div className={style.add_task_container}>
                    <form onSubmit={handleAddCategory} method="post">
                        <input maxLength={8} type="text" name="new_vategory_name" id={style.new_category_input} ref={inputRef} />
                        <GoCheckCircleFill onClick={handleAddCategory} />
                    </form>
                </div> : null
            }
        </div>
        </div >
    )
}

export default SelectCategorySession