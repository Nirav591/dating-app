import React from 'react';
import { Button, Form, Input, notification, message, Divider } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../store/auth/reset-password';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default function ResetPassword () {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
 
  const openNotification = (placement, message) => {
    api.info({
      message,
      placement,
    });
  };

  const callBack = (response) => {
      message.success(response.message, 2);  
      setTimeout(()=>{
          navigate('/login');
        },4000)   
         
  };

  const onFinish = async(values) => {
    if (values.password !== values.confirmPassword) {
      openNotification('topRight', 'Password and Confirm Password must be same');
    }
    const token = new URLSearchParams(window.location.search).get('token');
    const payload = {password: values.password, token}
    await resetPassword(payload, callBack);   
  }

  return (
    <>
    {contextHolder}
   
    <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',  
    justifyContent: 'center', 
    marginTop:'12%',
   }}>
    <div style={{
    padding:"20px",
    height: '250px', 
    width:"455px", 
    border: "2px solid lightgrey",
  boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
    
  }}>
    <div style={{display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',marginBottom:"30px", fontSize:"25px"}}>
    Reset Password
    </div>
  
  <Form
    {...layout}
    name="nest-messages"
    onFinish={onFinish}
    style={{ maxWidth: 600 }}
  >
   
    <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter password!' }]} style={{marginRight:"60px"}}>
    <Input.Password
      iconRender={(visible) =>
        visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
      }
    />
    </Form.Item>
    <Form.Item name="confirmPassword" label="Confirm Password" rules={[{ required: true, message: 'Please enter Confirm Password!' }]} style={{marginRight:"60px"}}>
    <Input.Password
      iconRender={(visible) =>
        visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
      }
    />
    </Form.Item>
          <Divider/>
    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  </div>
  </div>
  </>
);
}

