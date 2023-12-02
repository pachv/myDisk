import {combineReducers,createStore,applyMiddleware} from "redux";
// import {composeWithDevTools } from 'redux-devtools-extension'
import userReducer from "./userReducer";
import fileReducer from "./fileReducer";
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
    user: userReducer,
    files: fileReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
