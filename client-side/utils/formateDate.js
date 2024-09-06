import { format, isToday, isYesterday, parseISO } from 'date-fns';

export const formatMessageDate = (date) => {
  if (!date) {
    console.warn('Date is undefined or null, using current date as fallback.');
    date = new Date(); // Fallback to the current date if `date` is undefined
  }

  try {
    // Normalize the date format to ISO 8601 if possible
    const messageDate = typeof date === 'string' ? parseISO(date) : new Date(date);
// const messageDate = new Date ("Fri Aug 23 2024 17:26:22 GMT+0530"); // check the today, yesterday and the day
    // const messageDate = new Date('2024-08-09T09:09:59.783Z');
    if (isNaN(messageDate.getTime())) {
      console.error('Invalid date:', date);
      return 'Invalid date'; // Handle invalid date
    }


    if (isToday(messageDate)) {
      return 'Today';
    } else if (isYesterday(messageDate)) {
      return 'Yesterday';
    } else {
      return format(messageDate, 'EEEE'); // Format as day of the week (e.g., 'Wednesday')
      // if want to display the day like this -- wednesday august date -- use this -- 'EEEE, MMMM d'.
    }
  } catch (error) {
    console.error('Error processing date:', error);
    return 'Invalid date';
  }
};

export const formatTimestamp = (date) => {
  if (!date) {
    console.warn('Date is undefined or null, using current date as fallback.');
    date = new Date(); // Fallback to the current date if `date` is undefined
  }

  try {
    // Normalize the date format to ISO 8601 if possible
    const parsedDate = typeof date === 'string' ? parseISO(date) : new Date(date);

    if (isNaN(parsedDate.getTime())) {
      console.error('Invalid date:', date);
      return 'Invalid time'; // Handle invalid date
    }

    return format(parsedDate, 'p'); // Format as time (e.g., '2:29 PM')
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid time';
  }
};
