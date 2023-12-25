import { Button, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'

import { TodoViewModel } from '@/http/models';

type TodoItemProps = {
  todoInfo: TodoViewModel | undefined;
  isLoading: boolean;
}

const TodoItem = ({ todoInfo, isLoading }: TodoItemProps) => {
  const navigate = useNavigate();

  return (
    <>
      {isLoading ? (
        <Spin />
      ): (
        <>
          <h1>상세 페이지</h1>
          <p>TodoId: {todoInfo?.todoId}</p>
          <p>제목: {todoInfo?.title}</p>
          <p>작성자: {todoInfo?.writer}</p>
          <p>내용: {todoInfo?.content}</p>
          <p>수행 여부: {todoInfo?.complete}</p>
          <p>작성일: {todoInfo?.createAt}</p>
          <Button
            type='primary'
            onClick={() => navigate('/todo')}
          >
            뒤로 가기
          </Button>
        </>
      )}
    </>
  );
};

export default TodoItem;