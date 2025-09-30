import { format } from 'date-fns';

const formatDateTime = (dateTime: Date) => {
  const result = format(new Date(dateTime), 'yyyy-MM-dd h:mm a');
  console.log(result);
  return result;
};

export { formatDateTime };
