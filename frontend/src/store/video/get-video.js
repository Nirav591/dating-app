import { fetchVideoList } from '../../api/video/fetch-videos';

export const fetchAllVideos = async(callBack, token) => {
    try {
      const response = await fetchVideoList(token);
      callBack && callBack(response);  

    } catch (error) {
      callBack && callBack(error);
    }
  };