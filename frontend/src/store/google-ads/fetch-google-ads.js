import { fetchGoogleAds } from '../../api/google-ads/fetch-google-ads';

export const getGoogleAds = async(callBack, token) => {
    try {
      const response = await fetchGoogleAds(token);
      callBack && callBack(response);  

    } catch (error) {
      callBack && callBack(error);
    }
  };