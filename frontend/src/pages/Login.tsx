import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from '@/hooks/storeHook';
import {
  setEmail,
  setIdToken,
  setLoginState,
  setName,
} from '@/store/userSlice';
import { IResponsePayload } from '@/types/auth-types';
import styles from '@/styles/pages/Login.module.css'

export default function Login() {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const dispatch = useAppDispatch();

  const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailInput(event.target.value);
  };

  const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(event.target.value);
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    /* create login request */
    const loginRequestBody = {
      email: emailInput,
      password: passwordInput,
    };

    /* send request to backend */
    const response = await fetch('http://localhost:4000/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginRequestBody),
    });

    if (!response.ok) {
      throw new Error(await response.json());
    }

    const data: IResponsePayload = await response.json();

    /* update user state */
    dispatch(setName(data.name));
    dispatch(setEmail(data.email));
    dispatch(setLoginState(true));
    dispatch(setIdToken(data.idToken));
  };

  return (
    <section className={styles.loginSection}>
      <h3>Login</h3>
      <form className={styles.loginForm} onSubmit={submitHandler}>
        <div className={styles.formControl}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={emailInput}
            onChange={emailChangeHandler}
          />
        </div>
        <div className={styles.formControl}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={passwordInput}
            onChange={passwordChangeHandler}
          />
        </div>
        <div className={styles.formActions}>
          <button type="submit">Log in</button>
        </div>
      </form>
    </section>
  );
}
