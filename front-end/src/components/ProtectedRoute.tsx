import { Navigate } from "react-router-dom";

export function ProtectedRoute({element}: { element: JSX.Element }) {
  const isAuthenticated = !!localStorage.getItem('authToken');
  return isAuthenticated ? element : <Navigate to={'/login'} />
}