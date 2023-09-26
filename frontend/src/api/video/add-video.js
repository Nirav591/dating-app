import Api from '../api';

export async function addVideo(data) {
  return await Api.post(`/video`, data).then((res) => {
    return res.data;
  });
}