import React, {useState} from 'react';
import {useDays} from "../../context/AppContext.tsx";
import s from "./weeklyTasks.module.css"
import {Switcher} from "../Switcher/Switcher.tsx";
import {formatDateToRussian} from "../../utils/formatDateToRussian.ts";
import {DayType, TaskType} from "../../types.ts";

export const WeeklyTasks = () => {
    const [onOffTasksForWeek, setOnOffTasksForWeek] = useState(true)
    const {getWeeklyTasks} = useDays();
    const weeklyTasks = getWeeklyTasks();

    const handleChangeSwitcher = (checked: boolean) => {
        setOnOffTasksForWeek(checked)
    }

    return (
        <div className={s.containerForWeekTasks}>
            <div className={s.weekSwitcher}>
                <h2>Показать задачи на неделю</h2>
                <Switcher callback={handleChangeSwitcher}/>
            </div>
            {!onOffTasksForWeek
                ?
                weeklyTasks.map((day: DayType) => (
                    <div key={day.date.toDateString()} className={day.isHoliday ? s.holiday : s.workDay}>
                        <h3>{formatDateToRussian(day.date)}</h3>
                        <ul>
                            {day.tasks.map((task: TaskType) => (
                                <li key={task.id} className={task.completed ? s.completed : ''}>
                                    <span>{task.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
                : <div></div>}
        </div>
    );
};



