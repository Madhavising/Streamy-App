import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import searchSlice from "./searchSlice";
import chatSlice from "./chatSlice";
import categorySlice from "./categorySlice";

const store = configureStore({
  reducer: {
    app: appSlice,
    videoCategory: categorySlice,
    search: searchSlice,
    chat: chatSlice,
  },
});

export default store;
