import React from 'react';
import { Form, Input, Button, Upload, Space, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { addVideoFile } from '../store/video/add-video';


export default function AddVideo () {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement, message) => {
    api.info({ message, placement });
  };

  const callBack = (response) => {
    if (response.message === 'Video added successfully!') {
      openNotification('topRight', 'Video added successfully!')
      setTimeout(() => {
        navigate('/video');
      }, 3000);
    } else {
      openNotification('topRight', 'Fail to add Video!')   
      setTimeout(() => {
        navigate('/video');
      }, 3000);
    }
  };

  const onFinish = async(values) => {   
    console.log(values,"values");
    if (values.video) {
      const formData = new FormData();
      formData.append('video', values.video[0].originFileObj);
      formData.append('title', values.title);

    await addVideoFile(formData, callBack);
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
 
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please enter title for video!' }]}
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
      
      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Add Video
        </Button>
      </Form.Item>
    </Form>
    </div>
    </>
  );
};

