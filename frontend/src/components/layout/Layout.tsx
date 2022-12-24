import { Outlet } from 'react-router-dom';
import MainNavigation from '@/components/layout/MainNavigation';

export default function Layout() {
  return (
    <>
      <MainNavigation />
      <main className="pages">
        <Outlet />
      </main>
    </>
  );
}
