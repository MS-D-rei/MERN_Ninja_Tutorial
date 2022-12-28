import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  email: string;
  // password: string;
  isLoggedIn: boolean;
  idToken: string;
}

const initialState: UserState = {
  name: '',
  email: '',
  // password: '',
  isLoggedIn: false,
  idToken: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    // setPassword: (state, action: PayloadAction<string>) => {
    //   state.password = action.payload;
    // },
    setLoginState: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setIdToken: (state, action: PayloadAction<string>) => {
      state.idToken = action.payload;
    }
  },
});

export const {setName, setEmail, setLoginState, setIdToken} = userSlice.actions
export default userSlice.reducer;
