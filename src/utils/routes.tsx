// routes.tsx
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import Layout from '../layout/LayOut';
import Home from '../pages/Home';
import BusinessMyPage from '../pages/BusinessMyPage';
import BusinessInfoPage from '../pages/BusinessInfoPage';
import PersonalMyPage from '../pages/PersonalMyPage';
import PersonalInfoPage from '../pages/PersonalInfoPage';
import ResumeListPage from '../pages/ResumeListPage';

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

      {
        path: 'personal/mypage',
        element: <Outlet />,
        children: [
          { index: true, element: <PersonalMyPage /> }, // /personal/mypage
          { path: 'profile', element: <PersonalInfoPage /> }, // /personal/mypage/profile
        ],
      },

      {
        path: 'business/mypage',
        element: <Outlet />,
        children: [
          { index: true, element: <BusinessMyPage /> }, // /business/mypage
          { path: 'profile', element: <BusinessInfoPage /> }, // /business/mypage/profile
        ],
      },
      {
        path: 'resume/list',
        element: <ResumeListPage />,
      },
    ],
  },
]);

export default routes;
