import { Expose } from 'class-transformer';

/** Todo 목록 아이템 모델 */
export class TodoListItemModel {
  @Expose()
  todoId: string;
  
  @Expose()
  title: string;

  @Expose()
  writer: string;

  @Expose()
  complete: boolean;
  
  @Expose()
  createAt: string;
}