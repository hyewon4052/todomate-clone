/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Ellipsis, Earth, Plus, SquarePen, Trash } from "lucide-react";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import TodoIcon from "./TodoIconSvg";
import { Sheet } from "react-modal-sheet";
import { selectedDateAtom } from "./Calendar";
import dayjs from "dayjs";
import { useEffect } from "react";
import "../index.css";

export type Todo = {
  id: number;
  text: string;
  date: Date;
  isdone: boolean;
};

const inputValueAtom = atom("");
const todoListAtom = atomWithStorage<Todo[]>("todoList", []);
const todoOpenBtnAtom = atom(false);
const modalOpenBtnAtom = atom(false);
export const monthDoneAtom = atom(0);

const TodoList = () => {
  const [selectedDate] = useAtom(selectedDateAtom);
  const [inputValue, setInputValue] = useAtom(inputValueAtom);
  const [todoList, setTodoList] = useAtom(todoListAtom);
  const [todoOpen, setTodoOpen] = useAtom(todoOpenBtnAtom);
  const [modalOpen, setModalOpen] = useAtom(modalOpenBtnAtom);
  const [, setMonthDone] = useAtom(monthDoneAtom);

  useEffect(() => {
    if (!selectedDate) return;

    const doneCount = todoList.filter(
      (todo) => dayjs(todo.date).isSame(selectedDate, "month") && todo.isdone
    ).length;

    setMonthDone(doneCount);
  }, [todoList, selectedDate, setMonthDone]);

  function onChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function addItem() {
    if (inputValue.trim() !== "" && selectedDate) {
      const newTodo: Todo = {
        id: todoList.length + 1,
        text: inputValue,
        date: selectedDate.toDate(),
        isdone: false,
      };
      setTodoList([...todoList, newTodo]);
      setInputValue("");
    }
  }

  function deleteItem(id: number) {
    const updateTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updateTodoList);
  }

  function changeDoneItem(id: number) {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, isdone: !todo.isdone } : todo
    );
    setTodoList(updatedTodoList);
  }

  const SelectedDateTodos = todoList.filter((todo) =>
    dayjs(todo.date).isSame(selectedDate, "day")
  );

  return (
    <div css={TodoListBox}>
      <div onClick={() => setTodoOpen(!todoOpen)} css={TodoTitle}>
        <Earth width="17px" />
        <span>카테고리 1</span>
        <Plus width="17px" />
      </div>
      {todoOpen && (
        <div
          css={AddBtnBox}
          tabIndex={-1}
          onBlur={(e) => {
            if (
              !e.currentTarget.contains(e.relatedTarget) &&
              inputValue.trim() !== ""
            ) {
              addItem();
            }
          }}
        >
          <TodoIcon />
          <input
            value={inputValue}
            type="text"
            onChange={onChangeValue}
            placeholder="Input"
            style={{
              border: "none",
              background: "transparent",
              borderCollapse: "collapse",
              borderBottom: "solid 1px #cacaca",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") addItem();
            }}
          />
        </div>
      )}
      <div css={TodoListCol}>
        {SelectedDateTodos.sort((a, b) => {
          if (a.isdone === b.isdone) return 0;
          return a.isdone ? 1 : -1;
        }).map((todo) => (
          <div css={TodoItemRow} key={todo.id}>
            <button css={todoBtnBox} onClick={() => changeDoneItem(todo.id)}>
              <TodoIcon color={todo.isdone ? "#63c3c9" : "#222222"} />
            </button>
            {todo.text}
            <Ellipsis cursor={"pointer"} onClick={() => setModalOpen(true)} />
            <Sheet isOpen={modalOpen} onClose={() => setModalOpen(false)}>
              <Sheet.Container
                style={{
                  left: "25%",
                  transform: "translate(-50%, -50%)",
                  width: "50%",
                  height: "100%",
                  backgroundColor: "#222222",
                }}
              >
                <Sheet.Header />
                <Sheet.Content>
                  <div css={ModalBox}>
                    <span>{todo.text}</span>
                    <div css={ModalItemBox}>
                      <div css={ModalItem}>
                        <SquarePen />
                        Edit
                      </div>
                      <div css={ModalItem} onClick={() => deleteItem(todo.id)}>
                        <Trash />
                        Delete
                      </div>
                    </div>
                  </div>
                </Sheet.Content>
              </Sheet.Container>
              <Sheet.Backdrop />
            </Sheet>
          </div>
        ))}
      </div>
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
  align-items: center;
  gap: 10px;
`;

const TodoListCol = css`
  width: 300px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const AddBtnBox = css`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  gap: 20px;
`;
const TodoTitle = css`
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 120px;
  height: 30px;
  border-radius: 300px;
  background-color: #1c1c1c;
  text-align: center;
  font-weight: bold;
  font-size: 15px;
  span {
    color: #63c3c9;
  }
`;

const TodoListBox = css`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

export default TodoList;
