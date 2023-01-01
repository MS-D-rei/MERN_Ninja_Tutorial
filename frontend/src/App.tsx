import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
// import Home from '@/pages/Home';
const Home = lazy(() => import('@/pages/Home'));
import Login from './pages/Login';
import Signup from "./pages/Signup";
// const Signup = lazy(() => import('@/pages/Signup'));
import { useAppSelector } from './hooks/storeHook';
import styles from '@/App.module.css';

export default function App() {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            isLoggedIn ? (
              <Suspense
                fallback={
                  <div className={styles.suspense}>
                    <div className={styles.loadingSpinner}></div>
                  </div>
                }
              >
                <Home />
              </Suspense>
            ) : (
              <Navigate to='/login' replace />
            )
          }
        />
        <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to='/' replace />} />
        <Route path="/signup" element={!isLoggedIn ? <Signup /> : <Navigate to='/' replace />} />
      </Route>
    </Routes>
  );
}
