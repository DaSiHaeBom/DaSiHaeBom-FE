import { createBrowserRouter } from 'react-router';
import { Outlet, Navigate } from 'react-router-dom';
import Layout from '../layout/LayOut';
import Home from '../pages/Home';
import Resume from '../pages/Resume';
import ResumeStart from '../pages/ResumeStart';

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
        path: 'Resume',
        element: <Resume />,
      },
      {
        path: 'ResumeStart',
        element: <ResumeStart />,
      },
    ],
  },
]);

export default routes;
