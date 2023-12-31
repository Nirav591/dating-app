import React, { useState } from 'react';
import { Form, Input, Button, Upload, Space, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { addVideoFile } from '../store/video/add-video';


export default function AddVideo () {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const openNotification = (placement, message) => {
    api.info({ message, placement });
  };

  const callBack = (response) => {
    if (response.message === 'All videos added successfully!') {
      openNotification('topRight', 'All videos added successfully!')
      setTimeout(() => {
        navigate('/video');
      }, 1000);
    } else {
      openNotification('topRight', 'Fail to add Videos!')   
      setTimeout(() => {
        navigate('/video');
      }, 1000);
    }
  };

  const onFinish = async(values) => {   
    if (values.video) {
      setIsSubmitting(true);
      const formData = new FormData();
      
      console.log(values.video,"video");
      formData.append('video', values.video);
      for (const file of values.video) {
        formData.append("video", file.originFileObj);
      }
      // formData.append('title', values.title);
      // formData.append('category', values.category);
      // formData.append('image', values.img[0].originFileObj);

    await addVideoFile(formData, callBack);
    setTimeout(()=>{
      setIsSubmitting(false);
    },1000);
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
      Add Video
    </Space>
    <Form form={form} name="addAppForm" onFinish={onFinish} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
 
      {/* <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please enter title!' }]}
      >
        <Input />
      </Form.Item> */}

      <Form.Item
        label="Video"
        name="video"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[{ required: true, message: 'Please select video!' }]}
      >
        <Upload name="video" listType="video" beforeUpload={() => false} multiple={true}>
          <Button icon={<UploadOutlined />}>Upload Video</Button>
        </Upload>
      </Form.Item>

      {/* <Form.Item
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
       */}
      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit" disabled={isSubmitting}>
          Add Video
        </Button>
      </Form.Item>
    </Form>
    </div>
    </>
  );
};

