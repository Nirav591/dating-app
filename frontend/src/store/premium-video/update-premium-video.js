import { updatePremiumVideo } from '../../api/premium-video/update-premium-video';

export const updatePremiumVideoFile = async({formData, id}, callBack) => {
    try {
      const response = await updatePremiumVideo({formData, id});
      callBack && callBack(response);  

    } catch (error) {
      callBack && callBack(error);
    }
  };