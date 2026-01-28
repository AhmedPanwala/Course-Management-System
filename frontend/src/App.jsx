import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./pages/Layout";
import CourseList from "./pages/CourseList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddCourse from "./pages/AddCourse";
import Cart from "./pages/Cart";
import EditCourse from "./pages/EditCourse";
import PaymentDetails from "./pages/PaymentDetails";
import PaymentSuccess from "./pages/PaymentSuccess";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import AdminRoutes from "./routes/AdminRoutes";

import "./index.css";

const App = () => {
  const MyRoutes = createBrowserRouter([
    // 🔹 AUTH ROUTES (NO NAVBAR / FOOTER)
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },

    //  PAYMENT ROUTES (NO NAVBAR / FOOTER)
    {
      path: "/payment",
      element: <PaymentDetails />,
    },
    {
      path: "/payment-success",
      element: <PaymentSuccess />,
    },

    //  APP ROUTES (WITH NAVBAR / FOOTER)
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes>
              <CourseList />
            </ProtectedRoutes>
          ),
        },
        {
          path: "add",
          element: (
            <AdminRoutes>
              <AddCourse />
            </AdminRoutes>
          ),
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "editcourse",
          element: (
            <AdminRoutes>
              <EditCourse />
            </AdminRoutes>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={MyRoutes} />;
};

export default App;
