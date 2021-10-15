import dayjs from "dayjs";
export const dbNow = () => dayjs().toDate();
export const StringToDate = (date) => dayjs(date).toDate();
