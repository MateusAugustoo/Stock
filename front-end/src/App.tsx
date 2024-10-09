import { RouterProvider } from 'react-router'
import { router } from './routers/routers'
import './utils/axiosConfig'
export const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}