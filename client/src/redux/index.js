import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {
  userReducer,
  userPageReducer,
  adminReducer,
} from '../pages';
// This will shape what the store looks like for us
// So the key passed into here, will be the root name of the state
// the value will be the reducer in charge of handling the state for that root name
export default combineReducers({
  form: formReducer,
  userPage: userPageReducer,
  admin:adminReducer,
});
