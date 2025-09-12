import { atom } from "jotai";
import dayjs from "dayjs";
import { selectedDateAtom } from "../calendar/atoms";
import { todoListAtom } from "./atoms";

export const selectedDateTodosAtom = atom((get) => {
  const todoList = get(todoListAtom);
  const selectedDate = get(selectedDateAtom);

  if (!selectedDate) return [];
  return todoList.filter((todo) =>
    dayjs(todo.date).isSame(selectedDate, "day")
  );
});
