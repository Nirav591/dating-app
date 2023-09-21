import React from 'react';
import { Button, Divider, Form, Input, notification } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../store/auth/sign-in';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default function SignIn () {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const openNotification = (placement, message) => {
    api.info({
      message,
      placement,
    });
  };
  
  const callBack = (response) => {
    console.log('Callback function invoked with response:', response);

    if (response.message === 'Login successful!') {
          openNotification('topRight', 'Login successful !') 
          setTimeout(()=>{
            navigate('/video');
          },1000);
                   
        } else {
          openNotification('topRight', response.response.data.message);
        }      
  };

  const onFinish = async(values) => {
    await loginUser(values.user, callBack)    
  }

  return (
    <>
    {contextHolder}
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',  
      justifyContent: 'center', 
      marginTop:'10%',
    }}>
      <div style={{
      padding:"20px",
      height: '280px', 
      width:"400px", 
      border: "2px solid lightgrey",
      boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
    
  }}>
    <div style={{display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',marginBottom:"20px", fontSize:"25px"}}>
        Login
    </div>
  
  <Form
    {...layout}
    name="nest-messages"
    onFinish={onFinish}
    style={{ maxWidth: 600 }}
  >
   
    <Form.Item name={['user', 'email']} label="Email" rules={[{ required: true, message: 'Please enter email!' }]}>
      <Input />
    </Form.Item>
    <Form.Item name={['user', 'password']} label="Password" rules={[{ required: true, message: 'Please enter password!'}]}>
    <Input.Password
      iconRender={(visible) =>
        visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
      }
    />
    </Form.Item>
    <Divider/>
    <Link to='/forgot-password'>   
      Forgot Password
    </Link>
  
    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
      <Button type="primary" htmlType="submit" style={{marginTop:"20px"}}>
        Login
      </Button>
    </Form.Item>
  </Form>
  </div>
  </div>
  </>
);
}

