import { configureStore, combineReducers } from "@reduxjs/toolkit";
import subscriptionReducer from "./redux-slices/SubscriptionSlice";
import cartReducer from "./redux-slices/cartSlice";
import userReducer from "./redux-slices/UserSlice";
import messageReducer from "./redux-slices/messageSlice"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({ 
  user: userReducer, 
  subscription: subscriptionReducer, 
  cart: cartReducer,
  message: messageReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
