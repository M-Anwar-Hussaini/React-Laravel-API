import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Users from "./views/Users";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboardjsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { path: "/", element: <Navigate to="/users" /> },
      { path: "/users", element: <Users /> },
      { path: "/dashboard", element: <Dashboard /> },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default router;
