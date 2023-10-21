import React, { useState } from 'react';
import { Form, Input, Button, Upload, Space, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { addVideoFile } from '../store/video/add-video';
import { addPremiumVideoFile } from '../store/premium-video/add-premium-video';


export default function AddPremiumVideo () {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [isSubmitting, setIsSubmitting] = useState  (false);
  
  
  const openNotification = (placement, message) => {
    api.info({ message, placement });
  };

  const callBack = (response) => {
    if (response.message === 'Premium Video added successfully!') {
      openNotification('topRight', 'Premium Video added successfully!')
      setTimeout(() => {
        navigate('/premium-video');
      }, 1000);
    } else {
      openNotification('topRight', 'Fail to add Premium Video!')   
      setTimeout(() => {
        navigate('/premium-video');
      }, 1000);
    }
  };

  const onFinish = async(values) => {   
    if (values.video && values.img) {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append('video', values.video[0].originFileObj);
      formData.append('title', values.title);
      formData.append('category', values.category);
      formData.append('image', values.img[0].originFileObj);

    await addPremiumVideoFile(formData, callBack);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <>
    {contextHolder}
    <div style={{marginTop:"20px"}}> 
    <Space style={{fontSize:"20px", display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom:"20px"}}>
      Add Premium Video
    </Space>
    <Form form={form} name="addAppForm" onFinish={onFinish} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
 
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please enter title!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Video"
        name="video"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[{ required: true, message: 'Please select video!' }]}
      >
        <Upload name="video" listType="video" beforeUpload={() => false}>
          <Button icon={<UploadOutlined />}>Upload Video</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        label="Category"
        name="category"
        rules={[{ required: true, message: 'Please enter Category!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Image"
        name="img"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[{ required: true, message: 'Please select image!' }]}
      >
        <Upload name="img" listType="image" beforeUpload={() => false}>
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
      </Form.Item>
      
      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit" disabled={isSubmitting}>
          Save
        </Button>
      </Form.Item>
    </Form>
    </div>
    </>
  );
};

