import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home';
import Layout from '@/components/layout/Layout';
import Signup from '@/pages/Signup';
import Login from '@/pages/Login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
    ],
  },
]);
