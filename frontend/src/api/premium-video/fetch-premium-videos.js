import Api from '../api';

export async function fetchPremiumVideoList(token) {
  if (token) {
    Api.defaults.headers.common['Authorization'] = 'ABCDE';
  return await Api.get('/premium-video').then((res) => {    
    return res.data;
  });
  } else {
    console.log("No token in header");
  }
}