import { fetchPremiumVideoById } from '../../api/premium-video/fetch-premium-video-by-id';

export const getPremiumVideoById = async({callBack, id}) => {
    try {
      const response = await fetchPremiumVideoById(id);
      callBack && callBack(response);  

    } catch (error) {
      callBack && callBack(error);
    }
  };