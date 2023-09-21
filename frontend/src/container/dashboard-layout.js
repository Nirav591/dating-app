import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom'; 
import AccountPopover from './account-popover';
import { Link } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

export default function DashboardLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        theme="light"
      >
        <div className="demo-logo-vertical" style={{marginTop:"50px"}}/>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['2']}
        >
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link >User</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            <Link to="/video">Video</Link>
          </Menu.Item>
       </Menu>

      </Sider>
      <Layout >
        <Header style={{ padding: 0, background: colorBgContainer ,marginLeft:18}} >
          <div style={{display:"flex", flexDirection:"row-reverse", paddingRight: 24}}>
            <AccountPopover/>
          </div>
         
          </Header>
       
        <Content style={{ margin: '24px 16px 0' }}>
          <Outlet /> 
        </Content>
      </Layout>
    </Layout>
  );
};

