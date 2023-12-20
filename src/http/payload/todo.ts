export type TodoListPayload = {
  page: number;
  size: number;
  keyword?: string;
};

export type TodoViewPayload = {
  todoId: string;
};

// 수정