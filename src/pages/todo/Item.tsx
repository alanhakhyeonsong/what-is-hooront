import { useParams } from 'react-router-dom';

import TodoItem from '@/components/todo/Item';
import { useQueryGetTodoItem } from '@/http/queries';

const TodoItemPage = () => {
  const { todoId } = useParams<{ todoId: string }>();

  const todoInfo = useQueryGetTodoItem(
    {
      'todoId': todoId ?? '',
    },
    true
  );

  return (
    <>
      <TodoItem
        todoInfo={todoInfo.data}
        isLoading={todoInfo.isLoading}
      />
    </>
  );
};

export default TodoItemPage;