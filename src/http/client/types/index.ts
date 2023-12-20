import { PagingInfo } from '@/types/paging';

/** api 공통 응답 - 단일 객체 타입 */
export type ApiResponse<T> = {
  /** 성공 여부 */
  isSuccessful: boolean;
  /** 결과 데이터 */
  resultData: T;
  /** 응답 일시 */
  timestamp: string;
};

/** api 공통 응답 - 컬렉션 타입 */
export type ApiPaginatedResponse<T> = ApiResponse<T> & {
  /** 페이징 정보 */
  pageInfo: PagingInfo;
};

/** api 공통 응답 - 오류 */
export type ApiErrorResponse = ApiResponse<{
  error: {
    status: string;
    code: string;
    message: string;
  };
  fieldErrors: {
    field: string;
    rejectValue: string | number | boolean | null;
    message: string;
  }[];
}>;