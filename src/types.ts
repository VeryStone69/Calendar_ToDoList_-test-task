export interface DayType {
    date: Date;
    tasks: TaskType[];
    isHoliday: boolean;
}

export interface TaskType {
    id: string;
    text: string;
    completed: boolean;
}

