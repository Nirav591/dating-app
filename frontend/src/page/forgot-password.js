import React from 'react';
import { Button, Input, message, Divider } from 'antd';
import { forgotPassword } from '../store/auth/forgot-password';
import { Field, Formik, ErrorMessage } from 'formik';

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
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
      height: '210px', 
      width:"400px", 
      border: "2px solid lightgrey",
      boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',    
  }}>
    <div style={{display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',marginBottom:"30px", fontSize:"25px"}}>
      Forgot Password
    </div>
  
    <Formik
      initialValues={{
        email:'',        
      }}
      validate={validate}
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
        <ErrorMessage name="email">
          {(message) => <div style={{ color: 'red' }}>{message}</div>}
        </ErrorMessage>
      </div>
      <Divider/>
      <Button type="primary" htmlType="submit" style={{marginTop:"5px"}}>
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

