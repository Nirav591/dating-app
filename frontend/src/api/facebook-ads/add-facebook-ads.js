import Api from '../api';

export async function addFacebookAds(facebookAds) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'ABCDE',
  };
  return await Api.post(`/facebook-ads`, facebookAds, { headers }).then((res) => {
    return res.data;
  });
}