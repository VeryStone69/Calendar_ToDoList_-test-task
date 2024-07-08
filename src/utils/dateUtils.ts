import {instance} from "../api/isDayOff-api.ts";
import {DayType} from "../types.ts";

/**
 * Asynchronously fetches data to check if each day of the current month is a day off in Russia.
 *
 * @returns {Promise<number[]>} - A promise that resolves to an array of numbers representing the day-off status of each day.
 *                                1 indicates a holiday, 0 indicates a regular workday.
 *
 * @throws {Error} - If the server responds with a non-200 status code during the fetch operation.
 *
 * @example
 * const dayOffStatus = await checkIsDayOff();
 * console.log(dayOffStatus); // Output: [0, 0, 0, 1, 0, ...] (array representing day-off status for each day of the current month)
 */
export const checkIsDayOff = async (): Promise<number[]> => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    try {
        const response = await instance.get(`/getdata?year=${currentYear}&month=${currentMonth}&cc=ru&pre=0&delimeter=%0A&covid=0&sd=0`);
        if (response.status !== 200) {
            throw new Error(`Server responded with status code: ${response.status}`);
        }
        return response.data.split('\n').map(Number);
    } catch (error) {
        alert(`Error fetching data: ${error.message}`);
        return [];
    }
};

/**
 * Asynchronously initializes an array of DayType objects representing each day of the current month.

 * @returns {Promise<DayType[]>} - A promise that resolves to an array of DayType objects, each representing a day of the current month.
 * */
export const getInitialDays = async (): Promise<DayType[]> => {
    const daysTemp = await checkIsDayOff();
    const days: DayType[] = [];
    const currentDate = new Date();

    for (let i = 0; i < daysTemp.length; i++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1);
        days.push({
            date,
            tasks: [],
            isHoliday: daysTemp[i] === 1,
        });
    }
    return days;
};



