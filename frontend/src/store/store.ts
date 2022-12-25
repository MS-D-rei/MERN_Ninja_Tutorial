import { configureStore } from '@reduxjs/toolkit';
import workoutsReducer from '@/store/workoutsSlice';

export const store = configureStore({
  reducer: {
    workouts: workoutsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
