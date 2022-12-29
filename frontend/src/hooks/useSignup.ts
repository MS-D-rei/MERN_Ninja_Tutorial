import { useState } from 'react';
import { INotOkResponse, IResponsePayload } from '@/types/auth-types';
import { useAppDispatch } from './storeHook';
import { setName, setEmail, setLoginState, setIdToken } from '@/store/userSlice';

export function useSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{ [key: string]: string }>();

  const dispatch = useAppDispatch();

  const sendSignUpRequest = async (
    name: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);

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

      setIsLoading(false);

      /* when get data with status 400 from backend */
      if (!response.ok) {
        setError(data as INotOkResponse);
        return;
      }

      /* reset error for multiple try */
      setError(undefined);

      /* save the user info to local storage */
      localStorage.setItem('user', JSON.stringify(data));

      /* update user state */
      dispatch(setName(data.name));
      dispatch(setEmail(data.email));
      dispatch(setLoginState(true));
      dispatch(setIdToken(data.idToken));

      return data as IResponsePayload;
    } catch (err) {
      if (err instanceof Error) {
        setIsLoading(false);
        setError({ name: err.name, message: err.message });
      } else {
        setIsLoading(false);
        setError({ message: `Unexpected Error: ${err}` });
      }
    }
  };

  return {
    isLoading,
    sendSignUpRequest,
    error,
  };
}
