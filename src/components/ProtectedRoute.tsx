import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('certiva_token');

  return token ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
