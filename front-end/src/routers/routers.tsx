import { createBrowserRouter } from "react-router-dom";
import { RegisterProduct } from "../pages/RegisterProduct";
import { Products } from "../pages/Products";
import { RegisterUserPage } from "../pages/user/RegisterPage";

export const router = createBrowserRouter([
  {
    path: 'register_product',
    element: <RegisterProduct />
  },
  {
    path: 'products',
    element: <Products />
  },
  {
    path: '/register_user',
    element: <RegisterUserPage /> 
  }
])