import { updateVideo } from '../../api/update-video';

export const updateVideoFile = async(payload, id, callBack) => {
    try {
      const response = await updateVideo(payload, id);
      callBack && callBack(response);  

    } catch (error) {
      callBack && callBack(error);
    }
  };