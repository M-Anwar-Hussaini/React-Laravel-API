import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Users from "./views/Users";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboardjsx";
import Userform from "./views/Userform";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { path: "/", element: <Navigate to="/users" /> },
      { path: "/users", element: <Users /> },
      { path: "/users/new", element: <Userform key="User Create" /> },
      { path: "/users/:id/edit", element: <Userform key="User Update" /> },
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
