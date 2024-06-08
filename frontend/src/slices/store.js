import { configureStore } from "@reduxjs/toolkit";
import { PostSlice } from "./CrudifSlice";

const store = configureStore({
  reducer: {
    post: PostSlice.reducer,
  },
});
export default store;
