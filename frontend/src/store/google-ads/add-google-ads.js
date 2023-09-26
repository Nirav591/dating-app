import { addGoogleAds } from '../../api/google-ads/add-google-ads';

export const addGoogleAd = async(googleAds, callBack) => {
    try {
      const response = await addGoogleAds(googleAds);
      callBack && callBack(response);  

    } catch (error) {
      callBack && callBack(error);
    }
  };