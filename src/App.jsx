import React from "react";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import DashboardScreen from "./screens/DashboardScreen/DashboardScreen";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginScreen />,
    },
    {
      path: "/register",
      element: <RegisterScreen />,
    },
    {
      path: "/dashboard",
      // element: token ? <FeedScreen /> : <Navigate to="/" replace />,
      element: <DashboardScreen />
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
