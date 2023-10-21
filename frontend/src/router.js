import { Navigate, useRoutes } from 'react-router-dom';
import ForgotPassword from './page/forgot-password';
import ResetPassword from './page/reset-password';
import SignIn from './page/sign-in';
import DashboardLayout from './container/dashboard-layout';
import VideoList from './page/video-list';
import AddVideo from './components/add-video';
import EditVideoForm from './components/edit-video';
import GoogleAdsList from './page/google-ads';
import FacebookAdsList from './page/facebook-ads';
import PremiumVideoList from './page/premium-video-list';
import EditPremiumVideoForm from './components/edit-premium-video';
import AddPremiumVideo from './components/add-premium-video';
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
        { path: 'video/edit-video/:id', element: <EditVideoForm /> },
        { path: 'add-video', element: <AddVideo/> },
        { path: 'premium-video', element: <PremiumVideoList /> },
        { path: 'premium-video/edit-premium-video/:id', element: <EditPremiumVideoForm /> },
        { path: 'add-premium-video', element: <AddPremiumVideo/> },
        { path: 'google-ads', element: <GoogleAdsList /> },
        { path: 'facebook-ads', element: <FacebookAdsList /> },
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
