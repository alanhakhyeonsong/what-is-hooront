/** Todo - 목록 응답 */
export type TodoListResponse = {
  todoId: string;
  title: string;
  writer: string;
  complete: boolean;
  createAt: string;
}[];

/** Todo - 상세 응답 */
export type TodoViewResponse = {
  todoId: string;
  title: string;
  writer: string;
  complete: boolean;
  createAt: string;
  /** 기타 내용 */
  content: string;
};