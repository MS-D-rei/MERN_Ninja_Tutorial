import { Link, redirect, useNavigate } from 'react-router-dom';
import styles from '@/styles/components/layout/MainNavigation.module.css';
import { useAppSelector } from '@/hooks/storeHook';
import { useLogout } from '@/hooks/useLogout';

export default function MainNavigation() {
  const userState = useAppSelector((state) => state.user);
  const { isLoggedIn } = userState;
  const { logout } = useLogout();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/">Workout Todo</Link>
        </div>
        <nav className={styles.nav}>
          <ul>
            {!isLoggedIn && (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
