import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { createLogger } from 'redux-logger';

import App from './App';

import rootReducer from './redux';

const logger = createLogger({
  predicate: (getState, action) => (
    (action.type !== '@@redux-form/CHANGE') &&
    (action.type !== '@@redux-form/BLUR') &&
    (action.type !== '@@redux-form/FOCUS') &&
    (action.type !== '@@redux-form/UPDATE_SYNC_ERRORS') &&
    (action.type !== '@@redux-form/TOUCH')
  ),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [logger],
});

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  ,
  document.getElementById('root'));
