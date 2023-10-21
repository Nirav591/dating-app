import Api from '../api';

export async function fetchPremiumVideoById(id) {     
  return await Api.get(`/premium-video/${id}`).then((res) => {    
    return res.data;
  }); 
}