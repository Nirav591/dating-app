import { updateGoogleAds } from '../../api/google-ads/update-google-ads';

export const updateGoogleAdsById = async({googleAds}, callBack) => {
    try {
      const response = await updateGoogleAds({googleAds});
      callBack && callBack(response);  

    } catch (error) {
      callBack && callBack(error);
    }
  };