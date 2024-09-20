import { RouterProvider } from 'react-router'
import { router } from './routers/routers'

export const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}