import Api from './api';

export async function ResetPassword(data) {
  return await Api.post('/auth/reset-password', data).then((res) => {
    return res.data;
  });
}