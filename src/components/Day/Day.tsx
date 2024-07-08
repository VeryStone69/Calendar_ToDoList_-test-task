import React from 'react';
import {DayType} from '../../types';
import s from './day.module.css';

type Props = {
    day: DayType;
    callback: (day: DayType) => void;
}

export const Day = ({day, callback}: Props) => {
    return (
        <div className={`${day.isHoliday ? s.holiday : ''}`} onClick={() => callback(day)}>
            <div className={s.day}>{day.date.getDate()}</div>
        </div>
    );
};