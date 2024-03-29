import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, DEFAULT_TOTAL } from '@/constants';
import { usePagination } from '@/hooks/urlBaseFetch';
import { TodoListItemModel } from '@/http/models'
import { PagingInfo } from '@/types/paging';

type TodoListProps = {
  onUpdatePage: ReturnType<typeof usePagination>;
  listData: TodoListItemModel[] | undefined;
  pageData: Partial<PagingInfo>;
  isLoading: boolean;
}

const TodoList = ({ listData, pageData, isLoading, onUpdatePage }: TodoListProps) => {
  // AntD 게시판 컬럼
  const columns: ColumnsType<TodoListItemModel> = [
    {
      title: 'TODO ID',
      dataIndex: 'todoId',
      // 상세 화면으로 이동 가능
      render: (text) => <a>{text}</a>
    },
    {
      title: '제목',
      dataIndex: 'title',
    },
    {
      title: '작성자',
      dataIndex: 'writer',
    },
    {
      title: '수행 여부',
      dataIndex: 'complete',
    },
    {
      title: '생성일',
      dataIndex: 'createAt',
    },
    {
      title: '-',
      dataIndex: 'todoId',
      render: (todoId) => (
        <Button
          type='primary'
          href={`/todo/edit/${todoId}`}
        >
          수정
        </Button>
      ),
    }
  ];

  return (
    <>
      <Table
        columns={columns}
        rowKey={(listItem) => listItem.todoId}
        dataSource={listData || ([] as TodoListItemModel[])}
        pagination={{
          current: pageData.page ?? DEFAULT_PAGE,
          total: pageData.totalSize ?? DEFAULT_TOTAL,
          pageSize: pageData.size ?? DEFAULT_PAGE_SIZE,
          onChange: onUpdatePage,
          showSizeChanger: false,
        }}
        loading={isLoading}
      />
    </>
  );
}

export default TodoList;