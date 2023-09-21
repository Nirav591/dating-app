import Api from './api';

export async function updateVideo(data, id) {
  return await Api.put(`/video/${id}`, data).then((res) => {
    return res.data;
  });
}