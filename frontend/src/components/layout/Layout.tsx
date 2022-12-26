import { Outlet } from 'react-router-dom';
import MainNavigation from '@/components/layout/MainNavigation';
import styles from '@/styles/components/layout/Layout.module.css'

export default function Layout() {
  return (
    <>
      <MainNavigation />
      <main className={styles.pages}>
        <Outlet />
      </main>
    </>
  );
}
