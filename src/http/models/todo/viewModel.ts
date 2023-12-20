import { Expose } from 'class-transformer';

/** Todo 상세 아이템 모델 */
export class TodoViewModel {
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

  @Expose()
  content: string;
}