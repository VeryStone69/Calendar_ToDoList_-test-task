

/**
 * Formats a given Date object to a string in Russian locale.
 *
 * @param {Date} date - The date to format.
 * @return {string} - The formatted date string in Russian locale.
 *
 * @example
 * const date = new Date(2024, 6, 8); // July 8, 2024
 * const formattedDate = formatDateToRussian(date);
 * console.log(formattedDate); // Output: "понедельник, 8 июля 2024 г."
 */
export const formatDateToRussian = (date: Date): string => {
    return new Intl.DateTimeFormat('ru-RU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);
};