import React from "react";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import DashboardScreen from "./screens/DashboardScreen/DashboardScreen";
import HistoryScreen from "./screens/HistoryScreen/HistoryScreen";
import ScannerScreen from "./screens/ScannerScreen/ScannerScreen";
import { useSelector } from "react-redux";
import EditDocumentScreen from "./screens/EditDocumentScreen/EditDocumentScreen";

function App() {
  const token = localStorage.getItem("@jwt-token");

  const state_token = useSelector((state) => state.auth.token);
  const state_token_val = JSON.stringify(state_token);

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
      element: token ? <DashboardScreen /> : <Navigate to="/" replace />,
    },
    {
      path: "/history",
      element: token ? <HistoryScreen /> : <Navigate to="/" replace />,
    },
    {
      path: "/scandoc",
      element: token ? <ScannerScreen /> : <Navigate to="/" replace />,
    },
    {
      path: "/editdoc",
      element: token ? <EditDocumentScreen /> : <Navigate to="/" replace />,
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
