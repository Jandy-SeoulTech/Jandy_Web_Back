import dayjs from "dayjs";
export const dbNow = () => dayjs().add(9, "hour").toDate();
export const StringToDate = (date) => dayjs(date).toDate();
