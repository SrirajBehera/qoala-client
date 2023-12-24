import React from "react";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";

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
    // {
    //   path: "/feed",
    //   element: token ? <FeedScreen /> : <Navigate to="/" replace />,
    // },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
