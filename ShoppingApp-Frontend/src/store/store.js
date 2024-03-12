import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import logger from "redux-logger";

const middleware = [thunk, logger];

export const store = configureStore({
  reducer: rootReducer,
  middleware: () => {
    return middleware;
  },
});

export default store;
