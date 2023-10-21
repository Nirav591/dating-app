import { deletePremiumVideo } from '../../api/premium-video/delete-premium-video';

export const deletePremiumVideoFile = async(id, callBack) => {
    try {
      const response = await deletePremiumVideo(id);
      callBack && callBack(response);  

    } catch (error) {
      callBack && callBack(error);
    }
  };