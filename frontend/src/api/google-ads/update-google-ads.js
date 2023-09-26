import Api from '../api';

export async function updateGoogleAds({googleAds}) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'ABCDE',
  };
  return await Api.put(`/google-ads`, googleAds, {headers}).then((res) => {
    return res.data;
  });
}