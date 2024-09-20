import { createBrowserRouter } from "react-router-dom";
import { RegisterProduct } from "../pages/RegisterProduct";

export const router = createBrowserRouter([
  {
    path: 'register_product',
    element: <RegisterProduct />
  }
])