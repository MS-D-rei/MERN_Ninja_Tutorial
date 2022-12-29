import { ChangeEvent, FormEvent, useState } from 'react';
import styles from '@/styles/pages/Login.module.css';
import { useLogin } from '@/hooks/useLogin';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const navigate = useNavigate();

  const { sendLoginRequest, isLoading, error } = useLogin();

  const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailInput(event.target.value);
  };

  const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(event.target.value);
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    /* send login request and get response.json() data */
    /* if error => setError() */
    const data = await sendLoginRequest(emailInput, passwordInput);
    console.log(data);
    console.log(error);
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
          <button type="submit" disabled={isLoading}>
            Log in
          </button>
        </div>
        {error && <div className={styles.errorMessage}>{error.message}</div>}
      </form>
    </section>
  );
}
