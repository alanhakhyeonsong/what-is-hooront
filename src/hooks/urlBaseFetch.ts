import { useLocation, useNavigate } from 'react-router-dom';

import { PlanObject } from '@/types';
import { appendPageToSearchString, createSearchString, createUrlQueryParams } from '@/utils';

/** 페이지 업데이트 hook */
type UpdatePage = (page: number) => void;

/**
 * 페이지 번호를 전달받아 url 파라미터에 추가합니다.
 * @returns url 페이지 파라미터 업데이트 함수
 */
export const usePagination = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const updatePage: UpdatePage = (newPage = 1) => {
    const search = appendPageToSearchString(location.search, newPage);
    navigate({
      pathname: location.pathname,
      search,
    });
  };

  return updatePage;
};

/** URL 파라미터 가공 함수 */
type UpdateUrlConvertFunction = (
  formValue: ReturnType<typeof createUrlQueryParams>
) => ReturnType<typeof createUrlQueryParams>;

/** URL 파라미터 가공 옵션 */
type UpdateUrlConvertOption = { encode?: boolean; emptyIgnore?: boolean };

/**
 * 폼의 데이터를 url에 업데이트
 * @description 폼 유효성이 검증이 성공적으로 끝난 뒤 전달받은 데이터를 url에 저장
 * @param convertFunction 폼 데이터를 전달받아 쿼리 파라미터용 객체를 생성하여 반환하는 함수
 * @param options URL 파라미터 가공 옵션
 * @returns
 */
export const useUpdateUrlWithFormValues = (
  convertFunction: UpdateUrlConvertFunction,
  options?: UpdateUrlConvertOption
) => {
  const navigate = useNavigate();

  const returnFn = (fieldValues: PlanObject): void => {
    const queryParamObject = convertFunction(createUrlQueryParams(fieldValues));

    const search = createSearchString(queryParamObject, options);
    navigate({ pathname: location.pathname, search });
  };

  return returnFn;
};
