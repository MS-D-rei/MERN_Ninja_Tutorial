import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styles from '@/styles/pages/Login.module.css';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { login, resetError } from '@/store/userSlice';

export default function Login() {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const { status, error } = userState;

  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  const isDisable = status === 'loading' ? true : false;

  const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailInput(event.target.value);
  };

  const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(event.target.value);
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    /* send login request and get {name, email, idToken} data or {message} data */
    /* when get {message} data, it will be set to userState.error  */
    dispatch(login({ email: emailInput, password: passwordInput }))
      .unwrap()
      .then((data) => {
        navigate('/');
      })
      .catch((rejectedValue) => {});
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
          <button type="submit" disabled={isDisable}>
            Log in
          </button>
        </div>
        {error && <div className={styles.errorMessage}>{error.message}</div>}
      </form>
    </section>
  );
}
