import {Login} from '../Login/Loginpage';

import {
    LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    OTP_CHANGED,
    USER_ALREADY_LOGIN,
    IS_CONNECTED,
    OTP_NULL
} from '../Actions/type';

const INITIAL_STATE = {
    uid : '',
    displayName : '',
    photoURL : '',
    email : '',
    phoneNumber : '',
    providerId : '',
    isLoggedIn:'',
};

export default (state = INITIAL_STATE,action)=>{
   console.log(state);
   console.log(action.type);
   console.log(LOGIN_SUCCESS);
    switch(action.type){
           case LOGIN_SUCCESS:
           console.log("Inside Login Sucess",action.payload);
            return Object.assign({}, state, {
            isLoggedIn: action.payload,
            phoneNumber: '9045690400'
          });
         default:{
             console.log(action.type);
            return state;
         }
    }
   console.log(state);
};
// export default function() {
//     console.log(Login.userData);
//     return {
//         uid: "1596180000466149",
//         displayName: "Alok Kumar",
//         photoURL: "https://scontent.xx.fbcdn.net/v/t1.0-1/p100x100/18…g?oh=2568620ce3e7b52406db8bfa86bedfe2&oe=5AE75451", email: "dalokrockstar@gmail.com", phoneNumber: null
//     };
// }