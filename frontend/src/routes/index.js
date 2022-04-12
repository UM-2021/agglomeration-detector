import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
//
import Login from '../pages/Login';
import Register from '../pages/Register';
import DashboardApp from '../pages/DashboardApp';
import Room from '../pages/Room';
import Blog from '../pages/Blog';
import Alert from '../pages/Alert';
import Products from '../pages/Products';
import NotFound from '../pages/Page404';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'rooms', element: <Room /> },
        { path: 'alerts', element: <Alert /> },
        // Demo Purposes
        { path: 'blog', element: <Blog /> },
        { path: 'product', element: <Products /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
