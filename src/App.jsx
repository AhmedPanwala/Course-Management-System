import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './pages/Layout'
import CourseList from './pages/CourseList'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AddCourse from './pages/AddCourse'
import Cart from './pages/Cart'
import EditCourse from './pages/EditCourse'
import "./index.css"
import ProtectedRoutes from './routes/ProtectedRoutes'

const App = () => {
  const MyRoutes = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <ProtectedRoutes>
            <CourseList />
          </ProtectedRoutes>
        },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'signup',
          element: <Signup />
        },
        {
          path: 'add',
          element: <AddCourse />
        },
        {
          path: 'cart',
          element: <Cart />
        },
        {
            path:'editcourse',
            element:<EditCourse/>
        }
      ]
    }
  ])

  return <RouterProvider router={MyRoutes} />
}

export default App
