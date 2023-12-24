import React from "react";
import styles from "./DashboardScreen.module.css";
import Button from "@mui/material/Button";
import HistoryIcon from '@mui/icons-material/History';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../features/authSlice";

const DashboardScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className={styles.dashboard}>
      <span className={styles.back}>
        <span>S</span>
        <span>c</span>
        <span>a</span>
        <span>n</span>
        <span>-</span>
        <span>T</span>
        <span>h</span>
        <span>a</span>
        <span>i</span>
      </span>
      <h2 className={styles.underline_effect}>User Dashboard</h2>
      <div className={styles.btnRow}>
        <Button
          variant="contained"
          size="large"
          endIcon={<HistoryIcon />}
          onClick={() => {
            navigate("/history");
          }}
        >
          History
        </Button>
        <Button
          variant="contained"
          size="large"
          endIcon={<DocumentScannerIcon />}
          onClick={() => {
            navigate("/scandoc");
          }}
        >
          Scan ID
        </Button>
        <Button
          variant="contained"
          size="large"
          endIcon={<LogoutIcon />}
          onClick={() => {
            dispatch(logOut());
            localStorage.removeItem("@jwt-token");
            localStorage.removeItem("@user-details");
            navigate("/login", { replace: true });
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DashboardScreen;
