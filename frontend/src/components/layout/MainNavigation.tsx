import { Link } from "react-router-dom";
import styles from '@/styles/components/layout/MainNavigation.module.css'

export default function MainNavigation() {
  return (
    <header>
      <div className={styles.container}>
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
      </div>
    </header>
  );
}
