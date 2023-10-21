import Api from '../api';

export async function deletePremiumVideo(id) {
  return await Api.delete(`/premium-video/${id}`).then((res) => {
    return res.data;
  });
}