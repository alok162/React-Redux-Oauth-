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
    console.log("fb Login change",text,text.uid,text.displayName,text.photoURL,text.email,text.phoneNumber,text.phoneNumber);
    return  {
        uid: text.uid,
        displayName: text.displayName,
        photoURL: text.photoURL,
        email: text.email,
        phoneNumber: '1234567890',
        providerId: '1234567'
    };
};

export const success = (text) =>{
   console.log("chnages");   
}