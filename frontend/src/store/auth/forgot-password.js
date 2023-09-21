import { ForgotPassword } from '../../api/forgot-password'; 

export const forgotPassword = async(payload, callBack) => {
    try {
      const response = await ForgotPassword(payload);
      callBack && callBack(response);
     
    } catch (error) {
      callBack && callBack(error);
    }
  };