import appReducer from "./appReducer";
import { combineReducers } from "redux";

// gom các reducer lại thành 1
const rootReducer = combineReducers({
    app: appReducer,
})

export default rootReducer