import React, { useState } from 'react';
import { Button, Input, notification, message, Divider } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../store/auth/reset-password';
import { Field, Formik } from 'formik';


export default function ResetPassword () {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [showPassword, setShowPassword] = useState(false);

 
  const openNotification = (placement, message) => {
    api.info({ message, placement });
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
    } else {
      const token = new URLSearchParams(window.location.search).get('token');
      const payload = {password: values.password, token}
      await resetPassword(payload, callBack); 
    }      
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
  
    <Formik
      initialValues={{
        password:'', 
        confirmPassword:'',       
      }}
      onSubmit={onFinish}
    >
    {(formik) => (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="password">Password:</label>
        <Field
          type={showPassword ? 'text' : 'password'}
          name="password"
          as={Input.Password}
          placeholder="Password"
          iconRender={(visible) =>
            visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
          }
          style={{ marginTop: 5, marginBottom:10 }}
        />        
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <Field
          type={showPassword ? 'text' : 'password'}
          name="confirmPassword"
          as={Input.Password}
          placeholder="Confirm Password"
          iconRender={(visible) =>
            visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
          }
          style={{ marginTop: 5 }}
        />        
      </div>
      <Divider/>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </form>
    )}
    </Formik>
  </div>
  </div>
  </>
);
}

