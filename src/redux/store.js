import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";

const middleware = (getDefaultMiddleware) => [...getDefaultMiddleware()];

export default configureStore({
  reducer: reducers,
  middleware,
});
