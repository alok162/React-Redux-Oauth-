import {combineReducers} from 'redux';
import UserReducer from './Reducer-userdata';

const allReducers = combineReducers({
    users: UserReducer,
    // activeUser: ActiveUserReducer
});
export default allReducers