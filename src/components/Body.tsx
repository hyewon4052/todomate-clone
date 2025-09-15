/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { SmilePlus } from "lucide-react";
import Calendar from "./Calendar";
import TodoList from "./Todolist";
import Flex from "./Flex";

const Body = () => {
  return (
    <Flex col gap={20} pb={80} mt={40} height={"100%"}>
      <Flex row gap={15} width={"50%"}>
        <Flex col gap={15}>
          <Flex row mt={10} gap={10}>
            <div css={ProfileImg} />
            <Flex col>
              <span style={{ fontSize: "15px" }}>Name</span>
              <span style={{ fontSize: "13px" }}>Describe yourself here</span>
            </Flex>
            <SmilePlus />
          </Flex>
          <Calendar />
        </Flex>
        <TodoList />
      </Flex>
    </Flex>
  );
};

const ProfileImg = css`
  border-radius: 50px;
  width: 50px;
  height: 50px;
  background-color: #222222;
`;

export default Body;
