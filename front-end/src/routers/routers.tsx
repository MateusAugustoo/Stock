import { createBrowserRouter } from "react-router-dom";
import { RegisterProduct } from "../pages/RegisterProduct";
import { Products } from "../pages/Products";
import { RegisterUserPage } from "../pages/user/RegisterPage";
import { LoginPage } from "../pages/user/LoginPage";
import { ProtectedRoute } from "../components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterUserPage /> 
  },
  {
    path: 'register_product',
    element: <ProtectedRoute element={<RegisterProduct />} />
  },
  {
    path: 'products',
    element: <ProtectedRoute element={<Products />} />
  }
])