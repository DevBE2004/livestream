import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import userSlice from "./meSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "shop/me",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userSlice);

export const store = configureStore({
  reducer: {
    app: appSlice,
    me: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
