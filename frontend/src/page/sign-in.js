import React, { useState } from 'react';
import { Button, Divider, Input, notification } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../store/auth/sign-in';
import { Formik, Form, Field } from 'formik';


export default function SignIn () {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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
    await loginUser(values, callBack)    
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
    
    <Formik
      initialValues={{
        email:'',
        password:'',
      }}
      onSubmit={onFinish}
    >
    {(formik) => (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <Field
          type="text"
          name="email"
          as={Input}
          placeholder="Email"
          style={{ marginTop: 5 }}
        />
      </div>

      <div style={{ marginTop: 10 }}>
        <label htmlFor="password">Password:</label>
        <Field
          type={showPassword ? 'text' : 'password'}
          name="password"
          as={Input.Password}
          placeholder="Password"
          iconRender={(visible) =>
            visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
          }
          style={{ marginTop: 5 }}
        />
      </div>
      <Divider/>

      <div style={{ display:"flex", flexDirection:'column'}}>     
      <Link to='/forgot-password'>   
        Forgot Password
      </Link>
  
      <Button type="primary" htmlType="submit" style={{ marginTop: 10 }}>
        Login
      </Button>
      </div>

      </form>
    )}
    </Formik>
    
  </div>
  </div>
  </>
);
}

