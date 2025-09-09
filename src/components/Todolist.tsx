/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Ellipsis, Earth, Plus } from "lucide-react";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import TodoIcon from "./TodoIconSvg";

export type Todo = {
  id: number;
  text: string;
  date: Date;
};

const inputValueAtom = atom("");
const todoListAtom = atomWithStorage<Todo[]>("todoList", []);
const todoOpenBtnAtom = atom(false);

const TodoList = () => {
  const [inputValue, setInputValue] = useAtom(inputValueAtom);
  const [todoList, setTodoList] = useAtom(todoListAtom);
  const [todoOpen, setTodoOpen] = useAtom(todoOpenBtnAtom);

  function onChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function addItem() {
    if (inputValue.trim() !== "") {
      const newTodo: Todo = {
        id: todoList.length + 1,
        text: inputValue,
        date: new Date(),
      };
      setTodoList([...todoList, newTodo]);
      setInputValue("");
    }
  }

  return (
    <div css={TodoListBox}>
      <div onClick={() => setTodoOpen(!todoOpen)} css={TodoTitle}>
        <Earth width="17px" />
        오늘
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
        {todoList.map((todo) => (
          <div css={TodoItemRow} key={todo.id}>
            <TodoIcon />
            {todo.text}
            <Ellipsis cursor={"pointer"} />
          </div>
        ))}
      </div>
    </div>
  );
};

const TodoItemRow = css`
  display: flex;
  flex-direction: row;
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 120px;
  height: 40px;
  border-radius: 300px;
  background-color: #1c1c1c;
  text-align: center;
  font-weight: bold;
  font-size: 15px;
`;

const TodoListBox = css`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;
export default TodoList;
