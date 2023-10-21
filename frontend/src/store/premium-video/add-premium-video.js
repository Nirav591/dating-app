import { addPremiumVideo } from '../../api/premium-video/add-premium-video';

export const addPremiumVideoFile = async(payload, callBack) => {
    try {
      const response = await addPremiumVideo(payload);
      callBack && callBack(response);  

    } catch (error) {
      callBack && callBack(error);
    }
  };