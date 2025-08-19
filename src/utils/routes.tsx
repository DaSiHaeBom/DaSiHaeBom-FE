// routes.tsx
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import Layout from '../layout/LayOut';
import ResumeLayout from '../layout/ResumeLayOut';
import Home from '../pages/Home';
import BusinessMyPage from '../pages/BusinessMyPage';
import BusinessInfoPage from '../pages/BusinessInfoPage';
import PersonalMyPage from '../pages/PersonalMyPage';
import PersonalInfoPage from '../pages/PersonalInfoPage';
import Resume from '../pages/Resume';
import ResumeStart from '../pages/ResumeStart';
import ResumeConfirm from '../pages/ResumeConfirm';

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
        path: 'Resume',
        element: (
          <ResumeLayout>
            <Outlet />
          </ResumeLayout>
        ),
        children: [
          {
            index: true, // 기본 경로 '/'에서 home으로 자동 리다이렉트
            element: <Navigate to="/resume/start" replace />,
          },
          {
            path: 'start',
            element: <ResumeStart />,
          },
          {
            path: 'confirm',
            element: <ResumeConfirm />,
          },
          {
            path: 'qna',
            element: <Resume />,
          },
        ],
      },
    ],
  },
]);

export default routes;
