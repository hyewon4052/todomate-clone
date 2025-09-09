/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { SmilePlus } from "lucide-react";
import Calendar from "./Calendar";
import TodoList from "./Todolist";

const Body = () => {
  return (
    <div css={BodyLayout}>
      <div css={bodyItemList}>
        <div css={LeftBox}>
          <div css={ProfileBox}>
            <div css={ProfileImg} />
            <div css={NameBox}>
              <span style={{ fontSize: "15px" }}>Name</span>
              <span style={{ fontSize: "13px" }}>Describe yourself here</span>
            </div>
            <SmilePlus />
          </div>
          <Calendar />
        </div>
        <TodoList />
      </div>
    </div>
  );
};

const BodyLayout = css`
  margin-top: 40px;
  min-height: calc(100%-10%);
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 80px;
`;

const ProfileBox = css`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const ProfileImg = css`
  border-radius: 50px;
  width: 50px;
  height: 50px;
  background-color: #222222;
`;

const bodyItemList = css`
  width: 50%;
  display: flex;
  flex-direction: row;
  gap: 15px;
`;

const LeftBox = css`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const NameBox = css`
  display: flex;
  flex-direction: column;
`;

export default Body;
