import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../components/Editor/tasksSlice";

export default configureStore({
  reducer: {
    tasks: tasksReducer
  }
});
