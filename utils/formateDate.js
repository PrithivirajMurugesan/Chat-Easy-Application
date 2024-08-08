// utils/formatDate.js

import { format, isToday, isYesterday } from 'date-fns';

export const formatMessageDate = (date) => {
  const messageDate = new Date(date);

  if (isToday(messageDate)) {
    return 'Today';
  } else if (isYesterday(messageDate)) {
    return 'Yesterday';
  } else {
    return format(messageDate, 'EEEE'); // Format as day of the week (e.g., 'Wednesday')
  }
};

export const formatTimestamp = (date) => {
  return format(new Date(date), 'p'); // Format as time (e.g., '2:29 PM')
};
