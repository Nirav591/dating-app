import Api from '../api';

export async function updateVideo({formData, id}) {
  return await Api.put(`/video/${id}`, formData).then((res) => {
    return res.data;
  });
}