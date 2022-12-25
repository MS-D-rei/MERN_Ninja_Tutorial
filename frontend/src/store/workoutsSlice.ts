import { IWorkout } from '@/types/workout-type';
import { AnyAction, createSlice, PayloadAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

interface WorkoutsState {
  workouts: IWorkout[];
}

const initialWorkoutsState: WorkoutsState = {
  workouts: [],
};

export const workoutsSlice = createSlice({
  name: 'workouts',
  initialState: initialWorkoutsState,
  reducers: {
    setWorkouts: (state, action: PayloadAction<IWorkout[]>) => {
      state.workouts = action.payload;
    },
  },
});

/* thunk function to get all workouts from DB */
export const getAllWorkouts = () => {
  return async (
    dispatch: ThunkDispatch<RootState, unknown, AnyAction>
  ) => {
    try {
      const response = await fetch('http://localhost:4000/api/workouts')
      if (!response.ok) {
        throw new Error('Could not fetch workouts data');
      }
      const data: IWorkout[] = await response.json();
      dispatch(setWorkouts(data));
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log(`Unexpected Error: ${err}`);
      }
    }
  }
}

export const { setWorkouts } = workoutsSlice.actions;
export default workoutsSlice.reducer;
