import { fetchVideoById } from '../../api/fetch-video-by-id';

export const getVideoById = async(callBack, id) => {
    try {
      const response = await fetchVideoById(id);
      callBack && callBack(response);  

    } catch (error) {
      callBack && callBack(error);
    }
  };