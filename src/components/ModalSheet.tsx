/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Sheet } from "react-modal-sheet";
import { SquarePen, Trash } from "lucide-react";
import { type Todo } from "./Todolist";
import Flex from "./Flex";

type ModalSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedTodo: Todo | null;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  clearSelectedTodo: () => void;
};

const ModalSheet = ({
  isOpen,
  onClose,
  selectedTodo,
  onEdit,
  onDelete,
  clearSelectedTodo,
}: ModalSheetProps) => {
  return (
    <Sheet isOpen={isOpen} onClose={onClose} detent="content">
      <Sheet.Container
        style={{
          margin: "0 auto",
          left: 0,
          right: 0,
          position: "absolute",
          width: "40%",
          paddingBottom: "100px",
          backgroundColor: "var(--main-gray)",
          borderRadius: "16px",
        }}
      >
        <Sheet.Header />
        <Sheet.Content>
          {selectedTodo && (
            <Flex col center hc>
              <span>{selectedTodo.text}</span>
              <Flex row gap={10} mt={20}>
                <div
                  css={ModalItem}
                  onClick={() => {
                    clearSelectedTodo();
                    onEdit(selectedTodo.id);
                  }}
                >
                  <SquarePen />
                  Edit
                </div>
                <div css={ModalItem} onClick={() => onDelete(selectedTodo.id)}>
                  <Trash />
                  Delete
                </div>
              </Flex>
            </Flex>
          )}
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop
        onTap={() => {
          onClose();
          clearSelectedTodo();
        }}
      />
    </Sheet>
  );
};

export default ModalSheet;

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
