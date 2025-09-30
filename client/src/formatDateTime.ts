import { format } from 'date-fns';

const formatDateTime = (dateTime: Date) => {
  return format(new Date(dateTime), 'yyyy-MM-dd h:mm a');
};

export default { formatDateTime };
