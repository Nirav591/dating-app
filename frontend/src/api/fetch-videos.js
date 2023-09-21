import Api from './api';

export async function fetchVideoList(token) {
  if (token) {
    Api.defaults.headers.common['Authorization'] = 'ABCDE';
  return await Api.get('/video').then((res) => {    
    return res.data;
  });
  } else {
    console.log("No token in header");
  }
}