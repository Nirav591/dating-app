import Api from './api';

export async function fetchVideoById(id) {     
  return await Api.get(`/video/${id}`).then((res) => {    
    return res.data;
  }); 
}