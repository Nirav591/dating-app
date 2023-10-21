import { fetchPremiumVideoList } from '../../api/premium-video/fetch-premium-videos';

export const fetchAllPremiumVideos = async(callBack, token) => {
    try {
      const response = await fetchPremiumVideoList(token);
      callBack && callBack(response);  

    } catch (error) {
      callBack && callBack(error);
    }
  };