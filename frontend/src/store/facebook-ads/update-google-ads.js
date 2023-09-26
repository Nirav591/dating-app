import { updateFacebookAds } from '../../api/facebook-ads/update-facebook-ads';

export const updateFacebookAdsById = async({facebookAds}, callBack) => {
    try {
      const response = await updateFacebookAds({facebookAds});
      callBack && callBack(response);  

    } catch (error) {
      callBack && callBack(error);
    }
  };