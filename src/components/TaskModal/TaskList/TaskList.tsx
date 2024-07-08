import React from 'react';
import s from "../taskModal.module.css";
import {DayType, TaskType} from "../../../types.ts";

type Props = {
    day: DayType;
    onToggle: (id: string) => void
    onRemove: (id: string) => void
}
export const TaskList = ({day, onToggle, onRemove}: Props) => {
    return (
        <ul>
            {day.tasks.map((task: TaskType) => (
                <li key={task.id} className={task.completed ? s.completed : ''}>
                    <input
                        type="checkbox"
                        onChange={() => onToggle(task.id)}
                        checked={task.completed}
                    />
                    <span>{task.text}</span>
                    <button onClick={() => onRemove(task.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};