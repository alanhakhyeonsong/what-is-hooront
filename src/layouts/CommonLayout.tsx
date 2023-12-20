import { Layout, Menu } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';

const items = [
  {
    key: 1,
    label: (
      <Link to='/'>Home</Link>
    )
  },
  {
    key: 2,
    label: (
      <Link to="/about">About</Link>
    )
  }
];

export const CommonLayout = () => {
  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Menu
          theme='dark'
          mode='horizontal'
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <Suspense>
          <Outlet />
        </Suspense>
      </Content>
      <Footer style={{ textAlign: 'center' }}>삽질 Log... ©2023 Created by Ramos</Footer>
    </Layout>
  );
};