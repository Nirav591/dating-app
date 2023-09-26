import Api from '../api';

export async function addGoogleAds(googleAds) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'ABCDE',
  };
  return await Api.post(`/google-ads`, googleAds, { headers }).then((res) => {
    return res.data;
  });
}