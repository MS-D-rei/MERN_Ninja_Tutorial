import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IResponsePayload, INotOkResponse } from '@/types/auth-types';

interface UserState {
  name: string;
  email: string;
  isLoggedIn: boolean;
  idToken: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: INotOkResponse | null;
}

/* get user state from localstorage */
const userJSON = localStorage.getItem('user');
let user: IResponsePayload | null = null;
if (userJSON) {
  user = JSON.parse(userJSON);
}

const initialState: UserState = user
  ? {
      name: user.name,
      email: user.email,
      isLoggedIn: true,
      idToken: user.idToken,
      status: 'succeeded',
      error: null,
    }
  : {
      name: '',
      email: '',
      isLoggedIn: false,
      idToken: '',
      status: 'idle',
      error: null,
    };

/* signup async thunk function */
export const signup = createAsyncThunk<
  // return type of the payload creator
  IResponsePayload | INotOkResponse,
  // args type
  { name: string; email: string; password: string },
  // types for thunkAPI
  { rejectValue: INotOkResponse; serializedErrorType: INotOkResponse }
>('/user/signup', async ({ name, email, password }, thunkApi) => {
  const signupRequestBody = {
    name,
    email,
    password,
  };

  try {
    const response = await fetch('http://localhost:4000/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupRequestBody),
    });
    const data: IResponsePayload | INotOkResponse = await response.json();

    if (!response.ok) {
      return thunkApi.rejectWithValue(data as INotOkResponse);
    }

    localStorage.setItem('user', JSON.stringify(data));

    return data as IResponsePayload;
  } catch (err) {
    if (err instanceof Error) {
      return thunkApi.rejectWithValue({ message: err.message });
    } else {
      return thunkApi.rejectWithValue({ message: `Unexpected Error: ${err}` });
    }
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setLoginState: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setIdToken: (state, action: PayloadAction<string>) => {
      state.idToken = action.payload;
    },
    resetError: (state) => {
      state.error = null;
    } 
  },
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state, action) => {
      state.status = 'loading';
    }),
      builder.addCase(signup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.idToken = action.payload.idToken;
        state.isLoggedIn = true;
        state.error = null;
      }),
      builder.addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = action.error;
        }
      });
  },
});

export const { setName, setEmail, setLoginState, setIdToken, resetError } =
  userSlice.actions;
export default userSlice.reducer;
