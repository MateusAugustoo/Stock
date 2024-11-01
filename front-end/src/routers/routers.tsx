import { createBrowserRouter, Navigate } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { RegisterUserPage } from "../pages/user/RegisterPage";
import { LoginPage } from "../pages/user/LoginPage";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { Layout } from "../pages/Layout";
import { ProductManagement } from "../pages/products/ProductManagement";
import { RegisterProduct } from "../pages/products/RegisterProduct";

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
    path: '/',
    element: <ProtectedRoute element={<Layout />} />,
    children: [
      {
        path: '/',
        element: <Navigate to={'/home'} />
      },
      {
        path: '/home',
        element: <HomePage />
      },
      {
        path: '/finance',
        element: <></>
      },
      {
        path: '/productManagement',
        element: <ProductManagement />,
      },
    ]
  },
  {
    path: '/productManagement/register-product',
    element: <ProtectedRoute element={<RegisterProduct />}/>
  }
])