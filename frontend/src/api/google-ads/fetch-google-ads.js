import Api from '../api';

export async function fetchGoogleAds() {
  
  // Api.defaults.headers.common['Content-Type'] = 'application/json';
  return await Api.get('/google-ads').then((res) => {    
    return res.data;
  });
  // } else {
  //   console.log("No token in header");
  // }
}