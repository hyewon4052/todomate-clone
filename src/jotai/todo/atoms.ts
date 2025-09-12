import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { type Todo } from "../../components/Todolist";

export const inputValueAtom = atom("");
export const todoListAtom = atomWithStorage<Todo[]>("todoList", []);
export const monthDoneAtom = atom(0);
export const selectedTodoAtom = atom<Todo | null>(null);
export const openCategoryAtom = atom<number | null>(null);
export const openModalAtom = atom(false);
