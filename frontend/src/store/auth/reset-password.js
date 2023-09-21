import { ResetPassword } from '../../api/reset-password'; 

export const resetPassword = async(payload, callBack) => {
    try {
      const response = await ResetPassword(payload);
      callBack && callBack(response);
     
    } catch (error) {
      callBack && callBack(error);
    }
  };
