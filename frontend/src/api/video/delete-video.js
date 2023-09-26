import Api from '../api';

export async function deleteVideo(id) {
  return await Api.delete(`/video/${id}`).then((res) => {
    return res.data;
  });
}