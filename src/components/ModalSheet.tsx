/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Sheet } from "react-modal-sheet";
import { SquarePen, Trash } from "lucide-react";
import { type Todo } from "./Todolist";

type ModalSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedTodo: Todo | null;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
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
          width: "30%",
          paddingBottom: "100px",
          backgroundColor: "var(--main-gray)",
          borderRadius: "16px",
        }}
      >
        <Sheet.Header />
        <Sheet.Content>
          {selectedTodo && (
            <div css={ModalBox}>
              <span>{selectedTodo.text}</span>
              <div css={ModalItemBox}>
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
              </div>
            </div>
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
