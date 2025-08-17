// routes.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Layout from '../layout/LayOut';
import Home from '../pages/Home';
import MyPage from '../pages/MyPage';
import PersonalInfoPage from '../pages/PersonInfoPage';

const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: 'home', element: <Home /> },
      { path: 'mypage', element: <MyPage /> },
      { path: 'mypage/profile', element: <PersonalInfoPage /> },
    ],
  },
]);

export default routes;
