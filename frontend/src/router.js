import { Navigate, useRoutes } from 'react-router-dom';
import ForgotPassword from './page/forgot-password';
import ResetPassword from './page/reset-password';
import SignIn from './page/sign-in';
import DashboardLayout from './container/dashboard-layout';
import VideoList from './components/VideoList';
import AddVideo from './components/add-video';
// ----------------------------------------------------------------------

export default function Router() {
  const token = localStorage.getItem('token');
  const routes = useRoutes([ 
    {
      path: '/',
      element: token ? <DashboardLayout /> : <SignIn />,
      children: [
        { element: <Navigate to="/video" />, index: true },
        { path: 'video', element: <VideoList /> },
        // { path: 'app/edit_app/:id', element: <EditAppForm/> },
        { path: 'add-video', element: <AddVideo/> },

      ],
    },   
    {
      path: 'login',
      element: <SignIn />,
    },
    {
      path: 'forgot-password',
      element: <ForgotPassword />,
    },
    {
      path: 'reset-password',
      element: <ResetPassword />,
    },
  ]);

  return routes;
}
