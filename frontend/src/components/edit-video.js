import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Button, Space, Switch } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { fetchAppByIdAsync, updateAppAsync } from '../api/AppSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAppById } from '../Store/App/fetchAppById';
import { updateApp } from '../Store/App/updateApp';
import { getVideoById } from '../store/video/get-video-by-id';
import { updateVideoFile } from '../store/video/update-video';

export default function EditAppForm () {
  const {id} = useParams();
  const inputImgRef = useRef(null);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [img, setImg] = useState(null);
  const [newData, setNewData] = useState([]);
  const newVideoData = newData[0];
  const [selectedFile, setSelectedFile] = useState(null);
  const [handleFileChangeCalled, setHandleFileChangeCalled] = useState(false);
  const baseURL = process.env.REACT_APP_BASE_URL;


  const handleImageClick = () => {
    inputImgRef.current.click();
  };

  const handleFileChange = (file) => {
    setSelectedFile(file);
    setHandleFileChangeCalled(true);
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImg(e.target.result);        
      };
      reader.readAsDataURL(file);
    }
  };

  const onFinish = async(values) => {
    const formData = new FormData();
    if (selectedFile) {      
      formData.append('video', selectedFile);
      formData.append('title', values.title);
    } else {
      formData.append('title', values.title);
    }
    await updateVideoFile(formData, values.id, callback);
  };
  const callback = (response) => {
    if (response.message === 'Video updated successfully') {
      navigate('/video');  
    }  
  }

  const callBack = (response) => {
    const data = response;
    setNewData(data);
    setImg(data[0].logo);    
  };

  const addAndFetch = async() => {
    await getVideoById(id, callBack);  
  }

  useEffect(() => {
    addAndFetch();  
  }, [dispatch]); 

  return (
    <>
     {newVideoData (
       <Form
       form={form}
       name="editVideoForm"
       onFinish={onFinish}
       initialValues={{
       
        priorityAds: newVideoData?.priorityAds,
       }}
     >
      <Space style={{fontSize:"20px" ,display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom:"20px"}}>
        Video Details
      </Space>
    
      <div style={{ position: 'relative', width: "150px", height: "150px", marginBottom: 20 }}>
                {handleFileChangeCalled ? (
                    <img alt="title" src={img} width= "150px" height= "150px"/>
                  ) : (
                    <img alt="title" src={`${baseURL}/${img}`} width= "150px" height= "150px"/>
                  )}
                  <input
                    type="file"
                    ref={inputImgRef}
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileChange(e.target.files[0])}
                  />
                  <EditOutlined                    
                    onClick={() => handleImageClick()}
                    style={{
                      position: 'absolute',
                      right: -17,
                      top: -12,
                      height: 30,
                      width: 30,
                      backgroundColor: 'lightgrey',
                      borderRadius: 50,
                      padding: 3,
                    }}
                  />
                </div>



       <Form.Item label="Title" name="title">
         <Input />
       </Form.Item>
   
  
       <Form.Item>
         <Button type="primary" htmlType="submit">
           Save
         </Button>
       </Form.Item>
     </Form>
    )}
  
  </>
);
};


