import { combineReducers,applyMiddleware } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';

  const store = configureStore({
      reducer: combineReducers({
        data : reducer
      }),        
    })      
  export default  store;
  
  
//export default rootReducer;