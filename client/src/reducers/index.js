import { combineReducers } from "redux";
import chatLogsReducer from "./chatLogsReducer";
import connectionReducer from "./connectionReducer";
import requestingReducer from "./requestingReducer";

export default combineReducers({
  chatLogs: chatLogsReducer,
  connection: connectionReducer,
  requesting: requestingReducer
})