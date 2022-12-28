import { useState } from 'react';
import { INotOkResponse, IResponsePayload } from '@/types/auth-types';

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{ [key: string]: string }>();

  const sendLoginRequest = async (email: string, password: string) => {
    setIsLoading(true);

    const loginRequestBoby = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:4000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginRequestBoby),
      });

      const data: IResponsePayload | INotOkResponse = await response.json();

      setIsLoading(false);

      /* when get data with status 400 from backend */
      if (!response.ok) {
        setError(data as INotOkResponse);
        return;
      }
      /* save the user info to local storage */
      localStorage.setItem('user', JSON.stringify(data));

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
    sendLoginRequest,
    error,
  };
}
