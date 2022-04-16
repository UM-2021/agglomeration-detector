import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from '../components/Loader';
import { AuthContext } from '../hooks/useAuth';

function ProtectedRoutes() {
  const { currentUser, isLoading } = useContext(AuthContext);

  if (isLoading) return <Loader />;
  return currentUser.authed ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
