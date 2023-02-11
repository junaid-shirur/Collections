import { combineReducers } from "redux";
import common from "./common";


export default () => combineReducers({
    // router: connectRouter(history),
    // form: formReducer,
    common: common
})