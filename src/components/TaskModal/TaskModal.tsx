import React, {useState, useEffect} from 'react';
import {useTasks} from '../../context/AppContext';
import {DayType} from '../../types';
import s from './taskModal.module.css';
import {formatDateToRussian} from "../../utils/formatDateToRussian.ts";
import {TaskList} from "./TaskList/TaskList.tsx";
import {Button} from "../Button/Button.tsx";

type Props = {
    day: DayType;
    callback: () => void;
}

export const TaskModal = ({day, callback}: Props) => {
    const {addTask, removeTask, toggleTask} = useTasks();
    const [taskText, setTaskText] = useState('');

    useEffect(() => {
        setTaskText('');
    }, [day.tasks]);

    const handleAddTask = () => {
        if (taskText.trim()) {
            addTask(day.date, taskText.trim());
            setTaskText('');
        }
    };

    const handleToggleTask = (id: string) => toggleTask(day.date, id);

    const handleRemoveTask = (id: string) => removeTask(day.date, id);

    const handleClose = () => callback();

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleAddTask();
        }
    }

    return (
        <div className={s.taskModal} onClick={handleClose}>
            <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
                <Button callback={handleClose} title="×" styleName={s.close}/>
                <h2>{formatDateToRussian(day.date)}</h2>
                <input
                    type="text"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    onKeyPress={onKeyPressHandler}
                    placeholder="New task"
                />
                <Button callback={handleAddTask} title={"Add Task"}/>
                <TaskList day={day} onToggle={handleToggleTask} onRemove={handleRemoveTask}/>
            </div>
        </div>
    );
};

