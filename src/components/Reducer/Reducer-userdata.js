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

// Initial state null of reducer
const INITIAL_STATE = {
    uid : '',
    displayName : '',
    photoURL : '',
    email : '',
    phoneNumber : '',
    providerId : '',
    isLoggedIn:'',
};
// Redux reducer main function to update the every state cycle
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
