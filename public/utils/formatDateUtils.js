import { format } from 'https://esm.sh/date-fns';
const formatDate = (date) => {
    return format(date, 'MM/dd/yyyy h:m:ss');
};
export default formatDate;
