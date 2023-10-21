import Api from '../api';

export async function updatePremiumVideo({formData, id}) {
  return await Api.put(`/premium-video/${id}`, formData).then((res) => {
    return res.data;
  });
}