import { useQuery } from '@tanstack/react-query';
import { plainToInstance } from 'class-transformer';

import { getTodoItem, getTodoList } from '../api';
import { TodoListItemModel, TodoViewModel } from '../models';
import { TodoListPayload, TodoViewPayload } from '../payload';

/** Todo 목록 */
export const useQueryGetTodoList = (queryPayload: TodoListPayload, enabled: boolean) => {
  const queryKey: [string, TodoListPayload] = ['QUERY_TODO_LIST', queryPayload];

  return useQuery({
    queryKey,
    queryFn: ({ queryKey: [_, payload] }) => getTodoList(payload),
    enabled,
    select: (res) => {
      const resultData = res.data.resultData.map((item) => 
        plainToInstance(TodoListItemModel, item, { excludeExtraneousValues: true })
      );

      return {
        pageInfo: res.data.pageInfo,
        resultData
      };
    },
  });
};

/** Todo 상세 */
export const useQueryGetTodoItem = (queryPayload: TodoViewPayload, enabled: boolean) => {
  const queryKey: [string, TodoViewPayload] = ['QUERY_TODO_ITEM', queryPayload];

  return useQuery({
    queryKey,
    queryFn: ({ queryKey: [_, payload] }) => getTodoItem(payload),
    enabled,
    select: (res) => {
      return plainToInstance(TodoViewModel, res.data.resultData, { excludeExtraneousValues: true });
    },
  });
};