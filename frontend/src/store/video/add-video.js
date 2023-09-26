import { addVideo } from '../../api/video/add-video';

export const addVideoFile = async(payload, callBack) => {
    try {
      const response = await addVideo(payload);
      callBack && callBack(response);  

    } catch (error) {
      callBack && callBack(error);
    }
  };