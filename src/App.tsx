import React from 'react';
import {Calendar} from './components/Calendar/Calendar.tsx';
import {AppProvider} from './context/AppContext';
import {WeeklyTasks} from "./components/WeeklyTasks/WeeklyTasks.tsx";

export const App = () => {
    return (
        <AppProvider>
            <div className="app">
                <Calendar/>
                <WeeklyTasks/>
            </div>
        </AppProvider>
    );
};
