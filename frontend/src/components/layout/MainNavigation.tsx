import { Link } from 'react-router-dom';
import styles from '@/styles/components/layout/MainNavigation.module.css';
import { useAppSelector } from '@/hooks/workoutsHook';

export default function MainNavigation() {
  const userState = useAppSelector((state) => state.user);
  const { isLoggedIn } = userState;
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
          </ul>
        </nav>
      </div>
    </header>
  );
}
