import { atom } from "jotai";
import dayjs from "dayjs";

export const currentMonthAtom = atom(dayjs());
export const selectedDateAtom = atom(dayjs());
