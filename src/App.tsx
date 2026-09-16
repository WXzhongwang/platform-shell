import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout, Menu, Typography, theme } from 'antd';
import {
  AppstoreOutlined,
  HomeOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { start } from 'qiankun';
import { fetchApps, type MicroAppEntry } from './apps';

const { Header, Sider, Content } = Layout;

/**
 * 基座（基建应用）：
 * 1. 全局布局（侧边菜单/顶部栏）+ 一级路由
 * 2. 子应用注册与 qiankun 启动（注册表 TODO 从 Nacos 动态下发）
 * 3. 登录态管理（TODO: 对接 auth-service，401 统一拦截）
 */
export function App() {
  const [apps, setApps] = useState<MicroAppEntry[]>([]);
  const { token } = theme.useToken();

  useEffect(() => {
    fetchApps().then((list) => {
      setApps(list);
      start({
        prefetch: false,
        sandbox: { experimentalStyleIsolation: true },
      });
    });
  }, []);

  const menuItems = [
    { key: '/home', icon: <HomeOutlined />, label: '首页' },
    ...apps.map((a) => ({
      key: a.activeRule,
      icon: <AppstoreOutlined />,
      label: a.name,
    })),
  ];

  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider theme="dark" collapsible>
          <div
            style={{
              color: '#fff',
              textAlign: 'center',
              padding: 16,
              fontWeight: 600,
            }}
          >
            企业平台
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['/home']}
            items={menuItems}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              background: token.colorBgContainer,
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingInline: 24,
            }}
          >
            <Typography.Text style={{ marginRight: 12 }}>
              <UserOutlined /> 未登录（TODO 对接 auth-service）
            </Typography.Text>
            <Typography.Link>
              <LogoutOutlined /> 退出
            </Typography.Link>
          </Header>
          <Content style={{ margin: 16 }}>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<Navigate to="/home" replace />} />
            </Routes>
            {/* qiankun 子应用统一挂载点 */}
            <div id="subapp-container" />
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <div style={{ padding: 24, background: '#fff', borderRadius: 8 }}>
      <Typography.Title level={3}>首页</Typography.Title>
      <Typography.Paragraph type="secondary">
        基座骨架就绪。子应用经注册表动态加载：portal → /portal。
      </Typography.Paragraph>
    </div>
  );
}
