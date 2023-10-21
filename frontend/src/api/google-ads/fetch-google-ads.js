import Api from '../api';

export async function fetchGoogleAds() {
  return await Api.get('/google-ads').then((res) => {    
    return res.data;
  });
}