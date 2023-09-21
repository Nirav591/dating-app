import Api from './api';

export async function SignInList(data) {
  return await Api.post('/auth/sign-in', data).then((res) => {    
    return res.data;
  });
}