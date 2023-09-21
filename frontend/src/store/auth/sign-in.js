import { SignInList } from '../../api/sign-in'; 

export const loginUser = async(payload, callBack) => {
    try {
      const response = await SignInList(payload);      

      if (response.message === 'Login successful!') {
        const token = response.token;
        localStorage.setItem('token', token);  
        callBack && callBack(response);      
      }      
    } catch (error) {
      console.log(error,"error");
      callBack && callBack(error);
    }
  };
