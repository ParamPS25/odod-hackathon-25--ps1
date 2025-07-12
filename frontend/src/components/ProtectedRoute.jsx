// components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore.js';

const ProtectedRoute = ({ children }) => {
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <span className='text-lg'>Checking authentication...</span>
      </div>
    );
  }

  if (!authUser) {
    return <Navigate to="/loginPage" />;
  }

  return children;
};

export default ProtectedRoute;
