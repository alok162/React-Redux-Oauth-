import react from 'react';

import {
    LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    OTP_CHANGED,
    USER_ALREADY_LOGIN,
    IS_CONNECTED,
    OTP_NULL
} from './type';

export const fbLoginChanged = (text) => {
    console.log("fb Login change");
    console.log(text);
    return  {
        type: LOGIN_SUCCESS,
        payload: text
    };
};

export const success = (text) =>{
   console.log("chnages");   
}