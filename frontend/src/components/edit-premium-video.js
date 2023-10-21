import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Button, Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { getPremiumVideoById } from '../store/premium-video/get-premium-video-by-id';
import { updatePremiumVideoFile } from '../store/premium-video/update-premium-video';
import ReactPlayer from 'react-player';

export default function EditPremiumVideoForm() {
  const { id } = useParams();
  const inputVideoRef = useRef(null);
  const inputImgRef = useRef(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [img, setImg] = useState(null);
  const [newData, setNewData] = useState([]);
  const newVideoData = newData[0];
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [handleFileChangeCalled, setHandleFileChangeCalled] = useState(false);
  const [handleImageChangeCalled, setHandleImageChangeCalled] = useState(false);
  const baseURL = process.env.REACT_APP_BASE_URL;

  const handleImageClick = () => {
    inputImgRef.current.click();
  };

  const handleVideoClick = () => {
    inputVideoRef.current.click();
  };

  const handleFileChange = (file) => {
    setSelectedFile(file);
    setHandleFileChangeCalled(true);
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setVideo(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleImageChange = (file) => {
    setSelectedImage(file);
    setHandleImageChangeCalled(true);
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImg(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onFinish = async (values) => {
    
    const formData = new FormData();
    if (selectedFile && !selectedImage) {
      formData.append('video', selectedFile);
      formData.append('title', values.title);
      formData.append('category', values.category);
    } else if (!selectedFile && selectedImage) {
      formData.append('image', selectedImage);
      formData.append('title', values.title);
      formData.append('category', values.category);
    } else if (selectedFile && selectedImage) {
      formData.append('video', selectedFile);
      formData.append('image', selectedImage);
      formData.append('title', values.title);
      formData.append('category', values.category);
    } else {
      formData.append('title', values.title);
      formData.append('category', values.category);
    }
    await updatePremiumVideoFile({ formData, id: newVideoData.id }, callback);
  };
  const callback = (response) => {
    if (response.message === 'Premium Video updated successfully!') {
      navigate('/premium-video');
    }
  };

  const callBack = (response) => {
    const data = response;
    setNewData(data);
    setVideo(data[0].video);
    setImg(data[0].image);
  };

  const addAndFetch = async () => {
    await getPremiumVideoById({ id, callBack });
  };

  useEffect(() => {
    addAndFetch();
  }, []);

  return (
    <>
      {newVideoData && (
        <Form
          form={form}
          name='editVideoForm'
          onFinish={onFinish}
          initialValues={{
            id: newVideoData.id,
            title: newVideoData.title,
            category: newVideoData.category,
          }}
        >
          <Space
            style={{
              fontSize: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            Premium Video Details
          </Space>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div
              style={{
                position: 'relative',
                width: '300px',
                height: '200px',
                marginBottom: 20,
                marginRight: 50,
              }}
            >
              {handleFileChangeCalled ? (
                <ReactPlayer playing url={video} height='200px' width='300px' controls={true} />
              ) : (
                <ReactPlayer
                  playing
                  url={`${baseURL}/${video}`}
                  height='200px'
                  width='300px'
                  controls={true}
                />
              )}

              <input
                type='file'
                ref={inputVideoRef}
                style={{ display: 'none' }}
                onChange={(e) => handleFileChange(e.target.files[0])}
              />
              <EditOutlined
                onClick={() => handleVideoClick()}
                style={{
                  position: 'absolute',
                  right: -17,
                  top: 0,
                  height: 30,
                  width: 30,
                  backgroundColor: 'lightgrey',
                  borderRadius: 50,
                  padding: 3,
                }}
              />
            </div>

            <div
              style={{
                position: 'relative',
                width: '180px',
                height: '190px',
                marginBottom: 20,
                marginTop: 15,
              }}
            >
              {handleImageChangeCalled ? (
                <img alt='title' src={img} width='180px' height='180px' />
              ) : (
                <img alt='title' src={`${baseURL}/${img}`} width='180px' height='190px' />
              )}

              <input
                type='file'
                ref={inputImgRef}
                style={{ display: 'none' }}
                onChange={(e) => handleImageChange(e.target.files[0])}
              />
              <EditOutlined
                onClick={() => handleImageClick()}
                style={{
                  position: 'absolute',
                  right: -17,
                  top: -15,
                  height: 30,
                  width: 30,
                  backgroundColor: 'lightgrey',
                  borderRadius: 50,
                  padding: 3,
                }}
              />
            </div>
          </div>

          <Form.Item label='Title' name='title'>
            <Input />
          </Form.Item>

          <Form.Item label='Category' name='category'>
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Save
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
}
