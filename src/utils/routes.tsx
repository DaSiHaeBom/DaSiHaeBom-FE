import { createBrowserRouter } from 'react-router';
import { Outlet, Navigate } from 'react-router-dom';
import Layout from '../layout/LayOut';
import Home from '../pages/Home';
import Login from '../pages/Login';
import PersonalLogin from '../pages/PersonalLogin';
import BusinessLogin from '../pages/BusinessLogin';
import PersonalSignup from '../pages/PersonalSignup';
import Signup from '../pages/Signup';

const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        index: true, // 기본 경로 '/'에서 home으로 자동 리다이렉트
        element: <Navigate to="/home" replace />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'login/personal',
        element: <PersonalLogin />,
      },
      {
        path: 'login/business',
        element: <BusinessLogin />,
      },
      {
        path: 'signup/personal',
        element: <PersonalSignup />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
    ],
  },
]);

export default routes;
