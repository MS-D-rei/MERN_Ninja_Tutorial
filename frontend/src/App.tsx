import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
// import Home from '@/pages/Home';
const Home = lazy(() => import('@/pages/Home'));
import Login from './pages/Login';
import Signup from "./pages/Signup";
// const Signup = lazy(() => import('@/pages/Signup'));
import { useAppSelector } from './hooks/storeHook';
import styles from '@/App.module.css';

export default function App() {
  const idToken = useAppSelector((state) => state.user.idToken);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            idToken ? (
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
              <Login />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}
