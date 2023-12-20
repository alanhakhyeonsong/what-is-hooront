import dayjs from 'dayjs';
import { delay, http, HttpResponse } from 'msw';

import { createListDatabase, createResponseList, getResponseListData } from '@/mock-server/utils';

const listDatabase = createListDatabase(
  (index: number) => ({
    todoId: crypto.randomUUID(),
    title: `title_${index}`,
    writer: 'Ramos',
    complete: false,
    createAt: new Date().toISOString,
  }),
  5000
);

export const getList: Parameters<typeof http.get>[1] = async (info) => {
  await delay(1000);

  const url = new URL(info.request.url);
  const page = Number(url.searchParams.get('page')) || 1;
  const size = Number(url.searchParams.get('size'));
  const keyword = url.searchParams.get('keyword');

  const filteredList = listDatabase.filter((item) => {
    if (!keyword) {
      return item;
    }

    return item.title.includes(keyword);
  });

  const { list, totalPage, totalSize } = getResponseListData(filteredList, page, size);

  return HttpResponse.json(
    createResponseList({
      resultData: list,
      pageInfo: {
        page,
        size,
        totalPage,
        totalSize,
      },
    })
  );
}

// 상세

// 등록

// 수정

// 삭제