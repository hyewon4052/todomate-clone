import { atom } from "jotai";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { currentMonthAtom } from "./atoms";

export const daysCalendarAtom = atom((get) => {
  dayjs.extend(isoWeek);
  const currentMonth = get(currentMonthAtom);
  const startOfMonth = currentMonth.startOf("month");
  const endOfMonth = currentMonth.endOf("month");
  const startDate = startOfMonth.startOf("isoWeek");
  const endDate = endOfMonth.endOf("week");

  const days: dayjs.Dayjs[] = [];
  let date = startDate;
  while (date.isBefore(endDate) || date.isSame(endDate, "day")) {
    days.push(date);
    date = date.add(1, "day");
  }
  return days;
});
