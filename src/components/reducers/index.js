
import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsIsLoading } from './items';

// With the individual reducers created,
// we need to combine them into a rootReducer to create a single object.
// export with Redux's combineReducers()
export default combineReducers({
    items,
    itemsHasErrored,
    itemsIsLoading
});
