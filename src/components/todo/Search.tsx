import { SearchOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input } from 'antd';
import { useEffect } from 'react';

import { PlanObject } from '@/types';

/** search props 타입 정의 */
type TodoSearchProps = {
  onUpdateUrlWithFormValues: (fieldValues: PlanObject) => void;
  searchValue: Partial<{
    keyword: string;
  }>;
};
const TodoSearch = ({ searchValue, onUpdateUrlWithFormValues }: TodoSearchProps) => {
  const [form] = Form.useForm();

  // searchValue가 변경되면 폼을 동적으로 업데이트한다
  useEffect(() => {
    form.setFieldValue('keyword', searchValue.keyword || '');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <Flex
      justify="flex-end"
      style={{ marginBottom: 10 }}
    >
      <Form
        form={form}
        onFinish={onUpdateUrlWithFormValues}
      >
        <Flex gap={5}>
          <Form.Item
            name="keyword"
            style={{ marginBottom: 0 }}
          >
            <Input />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined />}
          >
            검색
          </Button>
        </Flex>
      </Form>
    </Flex>
  );
};

export default TodoSearch;