import { fetchFacebookAds } from '../../api/facebook-ads/fetch-facebook-ads';

export const getFacebookAds = async(callBack, token) => {
    try {
      const response = await fetchFacebookAds(token);
      callBack && callBack(response);  

    } catch (error) {
      callBack && callBack(error);
    }
  };