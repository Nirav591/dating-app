import { updateVideo } from '../../api/video/update-video';

export const updateVideoFile = async({formData, id}, callBack) => {
    try {
      const response = await updateVideo({formData, id});
      callBack && callBack(response);  

    } catch (error) {
      callBack && callBack(error);
    }
  };