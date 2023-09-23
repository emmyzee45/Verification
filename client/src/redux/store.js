import userReducer from "./redux-slices/UserSlice";
import messageReducer from "./redux-slices/MessageSlice";
import subscriptionReducer from "./redux-slices/SubscriptionSlice";
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
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({ 
  user: userReducer, 
  message: messageReducer, 
  subscription: subscriptionReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const makeStore = () => {
  const store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
    });
  store.__persistor = persistStore(store);
  return store;
};

export const wrapper = createWrapper(makeStore);