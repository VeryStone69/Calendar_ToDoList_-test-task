import React, {createContext, useEffect, useState, useContext} from 'react';
import {getInitialDays} from '../utils/dateUtils';
import {DayType} from "../types";

type TasksContextProps = {
    addTask: (date: Date, taskText: string) => void;
    removeTask: (date: Date, taskId: string) => void;
    toggleTask: (date: Date, taskId: string) => void;
}

type DaysContextProps = {
    days: DayType[];
    getWeeklyTasks: () => DayType[];
}

const TasksContext = createContext<TasksContextProps>({
    addTask: () => {
    },
    removeTask: () => {
    },
    toggleTask: () => {
    },
});

const DaysContext = createContext<DaysContextProps>({
    days: [],
    getWeeklyTasks: () => []
});

export const useTasks = () => useContext(TasksContext);
export const useDays = () => useContext(DaysContext);

export const AppProvider: React.FC = ({children}) => {
    const [days, setDays] = useState<DayType[]>([]);

    useEffect(() => {
        getInitialDays().then(setDays);
    }, []);

    const addTask = (date: Date, taskText: string) => {
        setDays(prevDays =>
            prevDays.map(day =>
                day.date.toDateString() === date.toDateString()
                    ? {...day, tasks: [{id: Date.now().toString(), text: taskText, completed: false}, ...day.tasks]}
                    : day
            )
        );
    };

    const removeTask = (date: Date, taskId: string) => {
        setDays(prevDays =>
            prevDays.map(day =>
                day.date.toDateString() === date.toDateString()
                    ? {...day, tasks: day.tasks.filter(task => task.id !== taskId)}
                    : day
            )
        );
    };

    const toggleTask = (date: Date, taskId: string) => {
        setDays(prevDays =>
            prevDays.map(day =>
                day.date.toDateString() === date.toDateString()
                    ? {
                        ...day,
                        tasks: day.tasks.map(task =>
                            task.id === taskId ? {...task, completed: !task.completed} : task
                        ),
                    }
                    : day
            )
        );
    };

    const getWeeklyTasks = (): DayType[] => {
        const currentDate = new Date();
        const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
        const endOfWeek = new Date(currentDate.setDate(currentDate.getDate() + 7));

        return days.filter(day => day.date >= startOfWeek && day.date <= endOfWeek);
    };

    return (
        <DaysContext.Provider value={{days, getWeeklyTasks}}>
            <TasksContext.Provider value={{addTask, removeTask, toggleTask}}>
                {children}
            </TasksContext.Provider>
        </DaysContext.Provider>
    );
};
