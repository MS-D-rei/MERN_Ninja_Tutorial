import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { useLogout } from '@/hooks/useLogout';
import { setWorkouts } from '@/store/workoutsSlice';
import styles from '@/styles/components/layout/MainNavigation.module.css';

export default function MainNavigation() {
  const dispatch = useAppDispatch();
  const { name, isLoggedIn } = useAppSelector((state) => state.user);
  const { logout } = useLogout();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    dispatch(setWorkouts([]));
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
              <>
                <li>
                  <p>{name}</p>
                </li>
                <li>
                  <button onClick={logoutHandler}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
