import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { apiKeysApi } from "./services/apiKeysApi";
import { rtkQueryErrorMiddleware } from "./middleware/errorMiddleware";

// Define the root reducer
const rootReducer = combineReducers({
  [apiKeysApi.reducerPath]: apiKeysApi.reducer,
});

// Configure persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    })
      .concat(apiKeysApi.middleware)
      .concat(rtkQueryErrorMiddleware),
});

export const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
