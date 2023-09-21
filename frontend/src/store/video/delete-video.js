import { deleteVideo } from '../../api/delete-video';

export const deleleVideoFile = async(callBack, id) => {
    try {
      const response = await deleteVideo(id);
      callBack && callBack(response);  

    } catch (error) {
      callBack && callBack(error);
    }
  };