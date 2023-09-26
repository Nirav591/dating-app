import Api from '../api';

export async function fetchFacebookAds() {  
  return await Api.get('/facebook-ads').then((res) => {    
    return res.data;
  }); 
}