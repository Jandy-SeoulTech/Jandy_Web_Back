import dayjs from "dayjs";
export const dbNow = () => dayjs().add(9, "hour").toDate();
