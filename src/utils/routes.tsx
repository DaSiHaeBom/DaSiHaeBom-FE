// routes.tsx
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
//layout
import PersonalLayout from '../layout/PersonalLayOut';
import BusinessLayout from '../layout/BusinessLayOut';

//page
import ResumeLayout from '../layout/ResumeLayOut';
import PersonalHome from '../pages/PersonalHome';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import PersonalLogin from '../pages/PersonalLogin';
import BusinessLogin from '../pages/BusinessLogin';
import PersonalSignup from '../pages/PersonalSignup';
import Signup from '../pages/Signup';
import BusinessMyPage from '../pages/BusinessMyPage';
import BusinessInfoPage from '../pages/BusinessInfoPage';
import PersonalMyPage from '../pages/PersonalMyPage';
import PersonalInfoPage from '../pages/PersonalInfoPage';
import ResumeListPage from '../pages/ResumeListPage';
import Resume from '../pages/Resume';
import ResumeStart from '../pages/ResumeStart';
import ResumeConfirm from '../pages/ResumeConfirm';
import BusinessSignup from '../pages/BusinessSignup';
import ResumeFinish from '../pages/ResumeFinish';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
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
  {
    path: 'signup/business',
    element: <BusinessSignup />,
  },
  {
    path: 'landing',
    element: <Landing />,
  },
  {
    path: 'personal',
    element: (
      <PersonalLayout>
        <Outlet />
      </PersonalLayout>
    ),
    children: [
      { path: 'home', element: <PersonalHome /> },
      {
        path: 'mypage',
        element: <Outlet />,
        children: [
          { index: true, element: <PersonalMyPage /> }, // /personal/mypage
          { path: 'profile', element: <PersonalInfoPage /> }, // /personal/mypage/profile
        ],
      },
      {
        path: 'resume',
        element: (
          <ResumeLayout>
            <Outlet />
          </ResumeLayout>
        ),
        children: [
          {
            index: true, // 기본 경로 '/'에서 home으로 자동 리다이렉트
            element: <Navigate to="start" replace />,
          },
          {
            path: 'start',
            element: <ResumeStart />,
          },
          {
            path: 'result',
            element: <ResumeConfirm />,
          },
          {
            path: 'qna/:questionNumber',
            element: <Resume />,
          },
          {
            path: 'finish',
            element: <ResumeFinish />,
          },
        ],
      },
    ],
  },
  {
    path: 'business',
    element: (
      <BusinessLayout>
        <Outlet />
      </BusinessLayout>
    ),
    children: [
      {
        path: 'mypage',
        element: <Outlet />,
        children: [
          { index: true, element: <BusinessMyPage /> }, // /business/mypage
          { path: 'profile', element: <BusinessInfoPage /> }, // /business/mypage/profile
        ],
      },
      {
        path: 'resume',
        element: <Outlet />,
        children: [
          { path: 'list', element: <ResumeListPage /> }, // /business/resume/list
        ],
      },
    ],
  },
]);

export default routes;
