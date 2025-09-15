/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Ellipsis, Earth, Plus, Check } from "lucide-react";
import { useAtom, useSetAtom, useAtomValue } from "jotai";
import TodoIcon from "./TodoIconSvg";
import ModalSheet from "./ModalSheet";
import { selectedDateAtom } from "../store/calendar/atoms";
import { selectedDateTodosAtom } from "../store/todo/selectors";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";
import "../index.css";
import {
  inputValueAtom,
  todoListAtom,
  monthDoneAtom,
  selectedTodoAtom,
  openCategoryAtom,
  openModalAtom,
} from "../store/todo/atoms";

export type Todo = {
  id: number;
  text: string;
  date: Date;
  isdone: boolean;
  categoryId: number;
};

export const categories = [
  { id: 1, name: "개인", color: "--category--01" },
  { id: 2, name: "작업", color: "--category--02" },
  { id: 3, name: "쇼핑", color: "--category--03" },
  { id: 4, name: "운동", color: "--category--04" },
];

const TodoList = () => {
  const [inputValue, setInputValue] = useAtom(inputValueAtom);
  const [todoList, setTodoList] = useAtom(todoListAtom);
  const [selectedTodo, setSelectedTodo] = useAtom(selectedTodoAtom);
  const [openCategory, setOpenCategory] = useAtom(openCategoryAtom);
  const [openModal, setOpenModal] = useAtom(openModalAtom);
  const selectedDateTodos = useAtomValue(selectedDateTodosAtom);
  const selectedDate = useAtomValue(selectedDateAtom);
  const setMonthDone = useSetAtom(monthDoneAtom);
  const inputBoxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!selectedDate) return;

    const doneCount = todoList.filter(
      (todo) => dayjs(todo.date).isSame(selectedDate, "month") && todo.isdone
    ).length;

    setMonthDone(doneCount);
  }, [todoList, selectedDate, setMonthDone]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        inputBoxRef.current &&
        !inputBoxRef.current.contains(e.target as Node)
      ) {
        if (inputValue.trim() !== "" && openCategory) {
          addItem(openCategory);
        }
        setOpenCategory(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [inputValue, openCategory]);

  function onChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function addItem(categoryId: number) {
    if (inputValue.trim() !== "" && selectedDate) {
      const newTodo: Todo = {
        id: todoList.length + 1,
        text: inputValue,
        date: selectedDate.toDate(),
        isdone: false,
        categoryId,
      };
      setTodoList([...todoList, newTodo]);
      setInputValue("");
    }
  }

  function deleteItem(id: number) {
    const updateTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updateTodoList);
    setSelectedTodo(null);
    setOpenModal(false);
  }

  function editItem(id: number) {
    const todo = todoList.find((t) => t.id === id);
    if (todo) {
      deleteItem(id);
      setInputValue(todo.text);
      addItem(todo.categoryId);
      setOpenCategory(todo.categoryId);
      setOpenModal(false);
    }
  }

  function changeDoneItem(id: number) {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, isdone: !todo.isdone } : todo
    );
    setTodoList(updatedTodoList);
  }

  function toggleCategory(id: number) {
    setOpenCategory((prev) => (prev === id ? null : id));
  }
  return (
    <div>
      {categories.map((c) => (
        <div key={c.id} css={TodoListBox}>
          <div
            onClick={() => toggleCategory(c.id)}
            css={css`
              ${TodoTitle};
              background-color: var(--main-gray);
            `}
          >
            <Earth width="15px" />
            <span style={{ color: `var(${c.color})` }}>{c.name}</span>
            <Plus width="15px" />
          </div>

          {openCategory === c.id && (
            <div css={AddBtnBox}>
              <button css={todoBtnBox}>
                <TodoIcon />
              </button>
              <input
                ref={inputBoxRef}
                value={inputValue}
                onChange={onChangeValue}
                placeholder="Input"
                onKeyDown={(e) => {
                  if (e.nativeEvent.isComposing) return;
                  if (e.key === "Enter") addItem(c.id);
                }}
                style={{
                  borderBottom: `solid 2px var(${c.color})`,
                }}
              />
            </div>
          )}

          <div css={TodoListCol}>
            {selectedDateTodos
              .filter((todo) => todo.categoryId === c.id)
              .sort((a, b) => (a.isdone === b.isdone ? 0 : a.isdone ? 1 : -1))
              .map((todo) => (
                <div css={TodoItemRow} key={todo.id}>
                  <div>
                    <button
                      css={todoBtnBox}
                      onClick={() => changeDoneItem(todo.id)}
                    >
                      <TodoIcon
                        colors={
                          todo.isdone
                            ? [`var(${c.color})`]
                            : ["var(--main-gray)"]
                        }
                      />
                      {todo.isdone && (
                        <Check
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "15px",
                            height: "15px",
                          }}
                        />
                      )}
                    </button>
                    <span
                      onClick={() => setSelectedTodo(todo)}
                      style={{ cursor: "pointer" }}
                    >
                      {todo.text}
                    </span>
                  </div>
                  <Ellipsis
                    cursor="pointer"
                    onClick={() => {
                      setOpenModal(true);
                      setSelectedTodo(todo);
                    }}
                  />
                </div>
              ))}
          </div>
        </div>
      ))}

      <ModalSheet
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        selectedTodo={selectedTodo}
        onEdit={editItem}
        onDelete={deleteItem}
        clearSelectedTodo={() => setSelectedTodo(null)}
      />
    </div>
  );
};

const todoBtnBox = css`
  position: relative;
  padding: 0;
  background-color: rgba(0, 0, 0, 0);
  height: 21px;
  width: 21px;
  cursor: pointer;
`;

const TodoItemRow = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  > div {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }
`;

const TodoListCol = css`
  width: 300px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 10px;
`;

const AddBtnBox = css`
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  gap: 20px;
  input {
    border: 0;
    border-style: none;
    border-collapse: collapse;
    width: 100%;
    height: 35px;
    background-color: transparent;
    outline: none;
  }
`;

const TodoTitle = css`
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 80px;
  height: 15px;
  border-radius: 300px;
  background-color: var(--main-gray);
  text-align: center;
  font-weight: 800;
  font-size: 14px;
`;

const TodoListBox = css`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

export default TodoList;
