import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  BookOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import AddBooks from '../.././components/Books/AddBooks';
import ReadFile from '../.././components/ReadFile';

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Books', '1', <BookOutlined />),
  getItem('Movies', '2', <DesktopOutlined />),
  getItem('Friends', 'sub1', <UserOutlined />, [
    getItem('Beza', '3'),
    getItem('Taha', '4'),
    getItem('Axel', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];
const HomePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Serge</Breadcrumb.Item>
          </Breadcrumb>
          <AddBooks/>
          <ReadFile/>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            Here is Serge's books
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          I2Prod Inc ©2023 Created by Byusa
        </Footer>
      </Layout>
    </Layout>
  );
};
export default HomePage;
