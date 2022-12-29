import { ChangeEvent, FormEvent, useState } from 'react';
import styles from '@/styles/pages/Signup.module.css';
import { useSignup } from '@/hooks/useSignup';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const navigate = useNavigate();

  const { sendSignUpRequest, isLoading, error } = useSignup();

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
    /* if error => setError() */
    const data = await sendSignUpRequest(nameInput, emailInput, passwordInput);
    console.log(data);
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
          <button type="submit" disabled={isLoading}>
            Sign up
          </button>
        </div>
        {error && <div className={styles.errorMessage}>{error.message}</div>}
      </form>
    </section>
  );
}
