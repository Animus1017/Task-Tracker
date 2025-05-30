import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import projectReducer from "./slices/projectSlice";
import taskReducer from "./slices/taskSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  project: projectReducer,
  task: taskReducer,
});

export default rootReducer;
