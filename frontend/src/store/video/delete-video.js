import { deleteVideo } from '../../api/video/delete-video';

export const deleteVideoFile = async(id, callBack) => {
    try {
      const response = await deleteVideo(id);
      callBack && callBack(response);  

    } catch (error) {
      callBack && callBack(error);
    }
  };