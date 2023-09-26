import React from 'react';
import { Popover, Space, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Navigate, useNavigate } from 'react-router-dom';


export default function AccountPopover () {
  const navigate = useNavigate();
  const userToken = localStorage.getItem('token');

  const content = (
    <div>
      <div style={{marginBottom:5}}>Profile</div>
      <div onClick={() => {
              window.localStorage.removeItem('token');
              navigate('/login');
            }}
            >Log Out</div>
    </div>
  );

  return (
    <>
    {!userToken && <Navigate to="/login" replace="true" />}
    <Space wrap>  
      <Popover content={content} trigger="click">
        <Avatar icon={<UserOutlined />} />
      </Popover>
    </Space>
    </>
  );
  
}
