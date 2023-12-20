import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useImmer } from 'use-immer';

import TodoList from '@/components/todo/List';
import TodoSearch from '@/components/todo/Search';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/constants';
import { usePagination, useUpdateUrlWithFormValues } from '@/hooks/urlBaseFetch';
import { TodoListPayload } from '@/http/payload/todo';
import { useQueryGetTodoList } from '@/http/queries';
import { parseSearchString } from '@/utils/url';

const TodoListPage = () => {
  const location = useLocation();

  const [searchValue, setSearchValue] = useImmer<Partial<{ keyword: string }>>({});
  /** 검색 페이로드 */
  const [searchPayload, setSearchPayload] = useImmer<TodoListPayload>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
    keyword: '',
  });

  /** 페이지가 변할 때마다 url 업데이트 */
  const handleUpdatePage = usePagination();
  /** 최초 마운트인지 아닌지를 추적하는 ref 생성 */
  const isInitialMount = useRef(true);

  /** list 가져오기 */
  const listQuery = useQueryGetTodoList(searchPayload, false);
  /** 폼 데이터를 url에 반영 */
  const updateUrlWithFormValues = useUpdateUrlWithFormValues((params) => {
    return params;
  });

  /** 검색 페이로드 업데이트  */
  const updateSearchPayload = () => {
    const searchObject = parseSearchString(location.search);
    // !SEE url기반 데이터를 이용해 기본값과 url데이터의 우선순위를 적절하게 가공하여 검색 페이로드를 생성.
    const newSearchPayload = {
      page: Number(searchObject?.page) || DEFAULT_PAGE,
      size: Number(searchObject?.size) || DEFAULT_PAGE_SIZE,
      keyword: String(searchObject.keyword ?? ''),
    };
    setSearchPayload(newSearchPayload);
  };

  /** 검색 UI 업데이트 */
  const updateSearchUI = () => {
    const urlData = parseSearchString(location.search);
    const keyword = urlData.keyword;
    const newSearchValue: { keyword?: string } = {};
    if (typeof keyword === 'string') {
      newSearchValue.keyword = keyword;
    }

    setSearchValue(newSearchValue);
  };

  /**
   * 검색 페이로드가 변경 되었을때 최초 마운트가 아니면 리패치 한다.
   */
  useEffect(() => {
    // !SEE 마운트 시점에 리패치를 무시하기 위해 마운트 여부 플래그 설정
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      // 리스트 리패치
      listQuery.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchPayload]);

  /**
   * location이 변경될 때 URL에 담긴 데이터를 기반으로 UI 업데이트 하고 검색 페이로드를 업데이트.
   */
  useEffect(() => {
    // UI 업데이트
    updateSearchUI();

    // 검색 페이로드 업데이트
    updateSearchPayload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <>
      <h1>TODO Page</h1>
      <TodoSearch 
        onUpdateUrlWithFormValues={updateUrlWithFormValues}
        searchValue={searchValue}
      />
      <TodoList
        onUpdatePage={handleUpdatePage}
        listData={listQuery.data?.resultData}
        pageData={{
          ...listQuery.data?.pageInfo,
          page: searchPayload.page,
        }}
        isLoading={listQuery.isLoading}
      />
    </>
  );
}

export default TodoListPage;