import { Modal } from 'antd';

import { useQueryGetTodoItem } from '@/http/queries';

type EditModalProps = {
  isModalOpen: boolean;
  todoId: string;
  handleOk: () => void;
  handleCancel: () => void;
};

const TodoEdit = ({ isModalOpen, todoId, handleOk, handleCancel }: EditModalProps) => {
  const todoInfo = useQueryGetTodoItem(
    {
      'todoId': todoId ?? '',
    },
    true
  );

  return (
    <>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <h1>수정 모달</h1>
        <p>Todo ID: {todoId}</p>
        <p>제목: {todoInfo.data?.title}</p>
        <p>작성자: {todoInfo.data?.writer}</p>
        <p>내용: {todoInfo.data?.content}</p>
        <p>수행 여부: {todoInfo.data?.complete}</p>
        <p>작성일: {todoInfo.data?.createAt}</p>
      </Modal>
    </>
  )
}

export default TodoEdit;