import React from 'react';
import { Button, Form, Input, message, Divider } from 'antd';
import { forgotPassword } from '../store/auth/forgot-password';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};


export default function ForgotPassword () { 
  const callBack = (response) => {
    if (response.message === 'Please check your mailbox!') {
      message.success('Please check your mailbox!', 2);          
        } else {
          message.error(response.response.data.message, 2);
        }      
  };

  const onFinish = async(values) => {
    await forgotPassword( values, callBack);   
  }

  return (
    <>
  
    <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',  
    justifyContent: 'center', 
    marginTop:'12%',
   }}>
    <div style={{
    padding:"20px",
    height: '200px', 
    width:"400px", 
    border: "2px solid lightgrey",
  boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
    
  }}>
    <div style={{display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',marginBottom:"30px", fontSize:"25px"}}>
    Forgot Password
    </div>
  
  <Form
    {...layout}
    name="nest-messages"
    onFinish={onFinish}
    style={{ maxWidth: 600 }}
  >
   
    <Form.Item name="email" label="Email" rules={[{ type: 'email', message: 'Please enter email!' }]} style={{marginRight:"60px"}}>
      <Input />
    </Form.Item>
       <Divider/>   
    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
      <Button type="primary" htmlType="submit" style={{marginTop:"20px"}}>
        Submit
      </Button>
    </Form.Item>
  </Form>
  </div>
  </div>
  </>
);
}

