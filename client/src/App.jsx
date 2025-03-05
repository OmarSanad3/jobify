import React from "react";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";

import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
} from "./pages/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> },
      { path: "register", element: <Register /> },
      { path: "dashboard", element: <DashboardLayout /> },
      { path: "login", element: <Login /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
  // return <h1>Hello</h1>;
};

export default App;
