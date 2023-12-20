/** 목록 형식의 최종 응답 생성 파라미터 */
export type CreateResponseListParam<T> = {
  resultData: T[];
  pageInfo: {
    page: number;
    size: number;
    totalPage: number;
    totalSize: number;
  };
};

/**
 * 객체 형식의 최종 응답 값을 생성한다.
 * @param param 응답 파라미터
 * @returns 목록 형식의 최종 응답
 */
export const createResponse = <T>(resultData: T, isSuccessful = true) => ({
  timestamp: new Date().toISOString(),
  isSuccessful,
  resultData,
});

/**
 * 목록 형식의 최종 응답 값을 생성한다.
 * @param param 응답 파라미터
 * @returns 목록 형식의 최종 응답
 */
export const createResponseList = <T>({
  resultData,
  pageInfo: { page, size, totalPage, totalSize },
}: CreateResponseListParam<T>) => ({
  timestamp: new Date().toISOString(),
  isSuccessful: true,
  resultData,
  pageInfo: {
    page,
    size,
    totalPage,
    totalSize
  },
});

/**
 * 목록 데이터를 생성한다.
 * @param creator 목록의 아이템을 생성하기 위한 콜백 함수
 * @param size 생성될 목록 크기
 * @returns 생성된 목록 데이터 정보
 */
export const createListDatabase = <T>(creator: (index: number) => T, size: number) =>
  Array.from({ length: size }).map((_, index) => creator(index));

/**
 * 페이징 처리된 목록과 페이징 데이터를 반환한다.
 * @param list 전체 데이터 목록
 * @param page 페이지 번호
 * @param size 페이지당 노출 레코드 수
 * @returns 페이징 처리된 목록과 페이징 데이터
 */
export const getResponseListData = (list: unknown[], page: number, size: number) => {
  page = page - 1;
  const startIndex = page * size;
  const endIndex = startIndex + size;
  const totalPage = Math.ceil(list.length / size);
  const totalSize = list.length;

  return {
    list: list.slice(startIndex, endIndex),
    totalPage,
    totalSize,
  };
};