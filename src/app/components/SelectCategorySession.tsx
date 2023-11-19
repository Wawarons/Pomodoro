import React, { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import style from '@/app/styles/goal-session.module.css'
import { TimeContext } from "@/app/context/TimerContext";
import { userAuth } from '../context/Authcontext';
import { Category } from '../type';
import { GoCheckCircleFill } from 'react-icons/go';
import { TbPlaystationX } from 'react-icons/tb';


const SelectCategorySession = () => {
    const context = useContext(TimeContext);
    if (!context)
        throw new Error('ShowTimeComponent must be used within Provider');
    const { timer, updateTimer } = context;
    const { user } = userAuth();
    const [showOptions, setShowOptions] = useState(false);
    const [catgeories, setCategories] = useState<Array<Category>>([]);
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        //Récupération des anciennes tâches
        const fetchData = async () => {
            if (user) {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/category/${user.uid}`
                );
                response.json().then((data) => {
                    setCategories(data);
                });
            }
        };
        if (user && !catgeories?.length) fetchData();

    }, [catgeories, user]);

    const handleAddCategory = (event: FormEvent) => {
        event?.preventDefault();
        const newCategoryName = inputRef.current?.value;
        if (newCategoryName && newCategoryName?.length > 0 && catgeories.length < 5 && user) {
            const newCategory: Category = {
                title: newCategoryName,
                id: catgeories.length > 0 ? catgeories[catgeories.length - 1]?.id + 1 : 1

            }
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/add/category/${user.uid}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    { title_category: newCategoryName }
                ),
            }).then((response) => {
                if (response.ok) {
                    setCategories([...catgeories, newCategory]);
                    if (inputRef.current?.value)
                        inputRef.current.value = "";
                }
            })
        } else {
            //Handle errors
        }
    };

    const handleDeleteCategory = (categoryTarget: Category) => {
        if (categoryTarget && catgeories.length > 1 && user) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete/category/${user.uid}/${categoryTarget.id}`, {
                method: 'DELETE'
            }).then((response) => {
                if (response.ok) {
                    setCategories(catgeories.filter((category: Category) => category.id !== categoryTarget.id));
                    if (catgeories.length === 1 || categoryTarget.id === timer.category_id) {
                        console.log(categoryTarget, timer.category_id);
                        updateTimer({
                            title_category: catgeories.find((category) => category.id !== categoryTarget.id)?.title,
                            category_id: catgeories.find((category) => category.id !== categoryTarget.id)?.id
                        });

                    }
                }
            })
        }
    }


    return (
        <div>
            <div id={style['title-session']} onClick={() => {
                if (!timer.sessionStart)
                    setShowOptions(!showOptions);

            }}>{timer.title_category}</div>
            <div className={`${style['title-session__option-container']} ${style[showOptions && !timer.sessionStart ? 'show_options' : 'hidden_options']}`}>
                {catgeories.length ?
                    catgeories.map((category: Category, index: number) => {
                        return (
                            <div key={`${category.id}_${index}`} className={style.category_item} onMouseEnter={() => setShowDeleteButton(true)} onMouseLeave={() => setShowDeleteButton(false)}>
                                <p className={style['title-session__option']} onClick={() => { updateTimer({ title_category: category.title, category_id: category.id }); setShowOptions(false) }}>{category.title}</p>
                                {showDeleteButton ?
                                    <TbPlaystationX className={`${showDeleteButton ? '' : 'hidden'}`} onClick={() => handleDeleteCategory(category)} /> : null
                                }
                            </div>

                        )
                    }) : null
                }
                {catgeories.length < 5 ?
                    <div className={style.add_task_container}>
                        <form onSubmit={handleAddCategory} method="post">
                            <input maxLength={8} type="text" name="new_vategory_name" id={style.new_category_input} ref={inputRef} />
                            <GoCheckCircleFill onClick={handleAddCategory} />
                        </form>
                    </div> : null
                    }
            </div>
        </div>
    )
}

export default SelectCategorySession