import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styles from '@/styles/pages/Signup.module.css';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { resetError, signup } from '@/store/userSlice';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const { status, error } = userState;

  const isDisable = status === 'loading' ? true : false;

  /* reset error when visit from other page */
  useEffect(() => {
    dispatch(resetError());
  }, [dispatch])

  const nameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNameInput(event.target.value);
  };

  const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailInput(event.target.value);
  };

  const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(event.target.value);
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    /* send signup request and get response.json() data */
    /* if error => user state will have error state */
    dispatch(
      signup({ name: nameInput, email: emailInput, password: passwordInput })
    )
      .unwrap()
      .then((data) => {
        navigate('/');
      })
      .catch((rejectedValue) => {});
  };

  return (
    <section className={styles.signupSection}>
      <h3>Sign up</h3>
      <form className={styles.signupForm} onSubmit={submitHandler}>
        <div className={styles.formControl}>
          <label htmlFor="username">Name:</label>
          <input
            type="text"
            id="username"
            value={nameInput}
            onChange={nameChangeHandler}
          />
        </div>
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
            Sign up
          </button>
        </div>
        {error && <div className={styles.errorMessage}>{error.message}</div>}
      </form>
    </section>
  );
}
