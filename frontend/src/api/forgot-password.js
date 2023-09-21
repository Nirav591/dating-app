import Api from './api';

export async function ForgotPassword(data) {
  return await Api.post('/auth/forgot-password', data).then((res) => {
    return res.data;
  });
}