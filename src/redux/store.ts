import { configureStore } from "@reduxjs/toolkit";
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
import todosReducer from "./todos/slice"
// import favoritesSlice from "./recipes/favoritesSlice";

const persistTodosConfig = {
  key: "todos",
  storage,
};

const persistedTodosReducer = persistReducer(persistTodosConfig, todosReducer);

export const store = configureStore({
  reducer: {
    todos: persistedTodosReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;