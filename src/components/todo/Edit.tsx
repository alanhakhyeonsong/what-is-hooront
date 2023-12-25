import { Modal } from 'antd';

import { TodoListItemModel } from '@/http/models';

type EditModalProps = {
  isModalOpen: boolean;
  todoId: string;
  item: TodoListItemModel;
  handleOk: () => void;
  handleCancel: () => void;
};

const TodoEdit = ({ isModalOpen, todoId, item, handleOk, handleCancel }: EditModalProps) => {

  return (
    <>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Todo ID: {todoId}</p>
        <p>제목: {item.title}</p>
        <p>작성자: {item.writer}</p>
        <p>수행 여부: {item.complete}</p>
      </Modal>
    </>
  )
}

export default TodoEdit;