import { getHttp } from '../client';
import { ApiPaginatedResponse, ApiResponse } from '../client/types';
import { TodoListPayload, TodoViewPayload } from '../payload';
import { TodoListResponse, TodoViewResponse } from '../response';

const http = getHttp();

/**
 * 목록 가져오기
 * @param params 검색 페이로드
 * @returns 
 */
export const getTodoList = (params: TodoListPayload) => {
  return http.get<ApiPaginatedResponse<TodoListResponse>>(`/todo`, {
    params,
  });
};

/**
 * 단일 가져오기
 * @param params 검색 페이로드
 * @returns 
 */
export const getTodoItem = (params: TodoViewPayload) => {
  return http.get<ApiResponse<TodoViewResponse>>(`/todo/${params.todoId}`);
}

// 수정