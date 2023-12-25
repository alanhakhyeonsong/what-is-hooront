import { Button, Modal, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, DEFAULT_TOTAL } from '@/constants';
import { usePagination } from '@/hooks/urlBaseFetch';
import { TodoListItemModel } from '@/http/models'
import { PagingInfo } from '@/types/paging';

import TodoEdit from './Edit';

type TodoListProps = {
  onUpdatePage: ReturnType<typeof usePagination>;
  listData: TodoListItemModel[] | undefined;
  pageData: Partial<PagingInfo>;
  isLoading: boolean;
}

const TodoList = ({ listData, pageData, isLoading, onUpdatePage }: TodoListProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [todoId, setTodoId] = useState('');

  const showModal = (id: string, modalType: string) => {
    setTodoId(id);
    if (modalType === 'edit') {
      setIsEditModalOpen(true);
    } else if (modalType === 'delete') {
      setIsDeleteModalOpen(true);
    }
  };

  const handleOk = (modalType: string) => {
    if (modalType === 'edit') {
      setIsEditModalOpen(false);
    } else if (modalType === 'delete') {
      setIsDeleteModalOpen(false);
    }
  };
  
  const handleCancel = (modalType: string) => {
    if (modalType === 'edit') {
      setIsEditModalOpen(false);
    } else if (modalType === 'delete') {
      setIsDeleteModalOpen(false);
    }
  };

  // AntD 게시판 컬럼
  const columns: ColumnsType<TodoListItemModel> = [
    {
      title: 'TODO ID',
      dataIndex: 'todoId',
      // 상세 화면으로 이동 가능
      render: (text) => <a href={`/todo/${text}`}>{text}</a>
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
      render: (id) => (
        <>
          <Button onClick={() => showModal(id, 'edit')}
            type='primary'
            // href={`/todo/edit/${todoId}`}
            >
            수정
          </Button>
          <TodoEdit
            isModalOpen={isEditModalOpen}
            todoId={todoId}
            handleOk={() => handleOk('edit')}
            handleCancel={() => handleCancel('edit')}
          />
        </>
      ),
    },
    {
      title: '-',
      dataIndex: 'todoId',
      render: (id) => (
        <>
          <Button onClick={() => showModal(id, 'delete')}
            type='primary'
            danger
          >
            삭제
          </Button>
          <Modal open={isDeleteModalOpen}
            onOk={() => handleOk('delete')}
            onCancel={() => handleCancel('delete')}>
            <h1>삭제 모달</h1>
          </Modal>
        </>
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