import Api from '../api';

export async function addPremiumVideo(data) {
  return await Api.post(`/premium-video`, data).then((res) => {
    return res.data;
  });
}