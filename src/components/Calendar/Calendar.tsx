import React, {useState, useEffect} from 'react';
import {Day} from '../Day/Day';
import {useDays} from '../../context/AppContext';
import s from './calendar.module.css';
import {TaskModal} from '../TaskModal/TaskModal';
import {DayType} from "../../types.ts";

export const Calendar = () => {
    const [selectedDay, setSelectedDay] = useState<DayType | null>(null);
    const {days} = useDays();

    useEffect(() => {
        if (selectedDay) {
            const updatedDay = days.find(day => day.date.toDateString() === selectedDay.date.toDateString());
            setSelectedDay(updatedDay || null);
        }
    }, [days, selectedDay]);

    return (
        <div className={s.calendarWrapper}>
            <div className={s.calendarHeader}>
                <img src="/main_img.jpg" alt="Calendar Image" className={s.calendarImage}/>
            </div>
            <div className={s.calendar}>
                {days.map(day => (
                    <Day key={day.date.toDateString()} day={day} callback={() => setSelectedDay(day)}/>
                ))}
            </div>
            {selectedDay && <TaskModal day={selectedDay} callback={() => setSelectedDay(null)}/>}
        </div>
    );
};
