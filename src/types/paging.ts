export type PagingInfo = {
  /** 현재 페이지 번호 */
  page: number;
  /** 현재 페이지에 노출할 데이터 건수 */
  size: number;
  /** 총 페이지 수 */
  totalPage: number;
  /** 총 데이터 수 */
  totalSize: number;
};
