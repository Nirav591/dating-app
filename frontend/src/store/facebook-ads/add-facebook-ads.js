import { addFacebookAds } from '../../api/facebook-ads/add-facebook-ads';

export const addFacebookAd = async(facebookAds, callBack) => {
    try {
      const response = await addFacebookAds(facebookAds);
      callBack && callBack(response);  

    } catch (error) {
      callBack && callBack(error);
    }
  };