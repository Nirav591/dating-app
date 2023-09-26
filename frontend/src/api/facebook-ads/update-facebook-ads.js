import Api from '../api';

export async function updateFacebookAds({facebookAds}) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'ABCDE',
  };
  return await Api.put(`/facebook-ads`, facebookAds, {headers}).then((res) => {
    return res.data;
  });
}