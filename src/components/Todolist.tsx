/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Ellipsis, Earth, Plus, SquarePen, Trash } from "lucide-react";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import TodoIcon from "./TodoIconSvg";
import { Sheet } from "react-modal-sheet";
import { selectedDateAtom } from "./Calendar";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";
import "../index.css";

export type Todo = {
  id: number;
  text: string;
  date: Date;
  isdone: boolean;
  categoryId: number;
  doneAt?: Date;
};

const inputValueAtom = atom("");
export const todoListAtom = atomWithStorage<Todo[]>("todoList", []);
export const monthDoneAtom = atom(0);
const selectedTodoAtom = atom<Todo | null>(null);
const openCategoryAtom = atom<number | null>(null);

const categories = [
  { id: 1, name: "개인", color: "--category--01" },
  { id: 2, name: "작업", color: "--category--02" },
  { id: 3, name: "쇼핑", color: "--category--03" },
  { id: 4, name: "운동", color: "--category--04" },
];

const TodoList = () => {
  const [selectedDate] = useAtom(selectedDateAtom);
  const [inputValue, setInputValue] = useAtom(inputValueAtom);
  const [todoList, setTodoList] = useAtom(todoListAtom);
  const [selectedTodo, setSelectedTodo] = useAtom(selectedTodoAtom);
  const [openCategory, setOpenCategory] = useAtom(openCategoryAtom);
  const [, setMonthDone] = useAtom(monthDoneAtom);
  const inputBoxRef = useRef<HTMLInputElement | null>(null);
  const todoListRef = useRef<HTMLDivElement | null>(null);

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
        todoListRef.current &&
        !todoListRef.current.contains(e.target as Node)
      ) {
        if (inputValue.trim() !== "" && openCategory) {
          addItem(openCategory);
        }
        setOpenCategory(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
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
  }

  function editItem(id: number) {}

  function changeDoneItem(id: number) {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id
        ? { ...todo, isdone: !todo.isdone, doneAt: new Date() }
        : todo
    );
    setTodoList(updatedTodoList);
  }

  function toggleCategory(id: number) {
    setOpenCategory((prev) => (prev === id ? null : id));
  }

  const SelectedDateTodos = todoList.filter((todo) =>
    dayjs(todo.date).isSame(selectedDate, "day")
  );

  return (
    <div ref={todoListRef}>
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
                  if (e.nativeEvent.isComposing) {
                    return;
                  }
                  if (e.key === "Enter") {
                    addItem(c.id);
                  }
                }}
                style={{
                  borderBottom: `solid 2px var(${c.color})`,
                }}
              />
            </div>
          )}

          <div css={TodoListCol}>
            {SelectedDateTodos.filter((todo) => todo.categoryId === c.id)
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
                    onClick={() => setSelectedTodo(todo)}
                  />
                </div>
              ))}
          </div>
        </div>
      ))}

      {selectedTodo && (
        <Sheet isOpen={!!selectedTodo} onClose={() => setSelectedTodo(null)}>
          <Sheet.Container
            style={{
              margin: " 0 auto",
              left: 0,
              right: 0,
              position: "absolute",
              width: "30%",
              height: "100%",
              backgroundColor: "var(--main-gray)",
            }}
          >
            <Sheet.Header />
            <Sheet.Content>
              <div css={ModalBox}>
                <span>{selectedTodo.text}</span>
                <div css={ModalItemBox}>
                  <div
                    css={ModalItem}
                    onClick={() => {
                      setSelectedTodo(null);
                      editItem(selectedTodo.id);
                    }}
                  >
                    <SquarePen />
                    Edit
                  </div>
                  <div
                    css={ModalItem}
                    onClick={() => deleteItem(selectedTodo.id)}
                  >
                    <Trash />
                    Delete
                  </div>
                </div>
              </div>
            </Sheet.Content>
          </Sheet.Container>
          <Sheet.Backdrop />
        </Sheet>
      )}
    </div>
  );
};

const todoBtnBox = css`
  padding: 0;
  background-color: rgba(0, 0, 0, 0);
  height: 21px;
  width: 21px;
  cursor: pointer;
`;

const ModalItem = css`
  display: flex;
  flex-direction: column;
  width: 230px;
  height: 100px;
  background-color: #333333;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
`;

const ModalItemBox = css`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const ModalBox = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    font-weight: 800;
  }
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
