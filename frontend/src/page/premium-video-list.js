import React, { useEffect, useState } from 'react';
import { EditOutlined, DeleteFilled } from '@ant-design/icons';
import { Button, Card, Space, Modal, notification } from 'antd';
import { Link } from 'react-router-dom';
import { fetchAllPremiumVideos } from '../store/premium-video/get-premium-video';
import ReactPlayer from "react-player";
import { deletePremiumVideoFile } from '../store/premium-video/delete-premium-video';

const { Meta } = Card;

export default function PremiumVideoList() {
  const token = localStorage.getItem("token");
  const baseURL = process.env.REACT_APP_BASE_URL;
  const [videos, setVideos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement, message) => {
    api.info({ message, placement });
  };

  const callBack = (response) => {
    const data = response;
    setVideos(data);
  };

  const addAndFetch = async () => {
    await fetchAllPremiumVideos(callBack, token);
  };

  const deleteCallback = (response) => {
    if(response.message === 'Premium Video deleted successfully'){
      openNotification('topRight', 'Premium Video deleted successfully!') 
    }
  };

  const handleDelete=async()=>{
    const id = deleteId;
    await deletePremiumVideoFile(id, deleteCallback);
    setIsModalOpen(false);
    setTimeout(() => {
      addAndFetch();
    }, 1000);    
  }
  
  const showModal = () => {
    setIsModalOpen(true);
  };
 
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {       
      addAndFetch();      
  }, []);

  return (
    <> 
    {contextHolder} 
    <Space style={{fontSize: "20px", marginBottom: "10px" }}>Premium Videos</Space>
    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginBottom:"40px" }}>  
      
      {videos && videos?.map((video)=> {
        const handleDeleteClick = () => {            
          setDeleteId(video.id);
          showModal();      
        };      
      return (
        <Card
         key={video.id}
         style={{ width: 300, marginRight: '20px', marginBottom: '10px' }}
         cover={
          <ReactPlayer playing url={`${baseURL}/${video.video}`}
          height='200px'
          width='300px'
          controls={true}
          />
         }
         actions={[            
          <Link to={`/premium-video/edit-premium-video/${video.id}`} key="edit">
            <EditOutlined />
          </Link>,
           <DeleteFilled onClick={handleDeleteClick}/>           
         ]}
        >
      
          <Modal
            title="Delete Premium Video"
            open={isModalOpen}
            onOk={handleDelete}
            onCancel={handleCancel}
            okText="Delete"
            cancelText="Cancel"
          >
            <p>Are you sure you want to delete this video? This action cannot be undone.</p>
          </Modal>
          <Meta
           title={video.title}
          />
        </Card>
      )})}
    </div>
    <div style={{display: 'flex',flexDirection: 'column', alignItems: 'center'}}>         
      <Link to={'/add-premium-video'}>
        <Button type='primary'>Add Premium Video</Button>
      </Link>
    </div>

    </>
  );
}