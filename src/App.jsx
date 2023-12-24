import React from "react";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import DashboardScreen from "./screens/DashboardScreen/DashboardScreen";
import HistoryScreen from "./screens/HistoryScreen/HistoryScreen";
import ScannerScreen from "./screens/ScannerScreen/ScannerScreen";

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
    {
      path: "/history",
      // element: token ? <FeedScreen /> : <Navigate to="/" replace />,
      element: <HistoryScreen />
    },
    {
      path: "/scandoc",
      // element: token ? <FeedScreen /> : <Navigate to="/" replace />,
      element: <ScannerScreen />
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
