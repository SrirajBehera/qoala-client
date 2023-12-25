import React, { useState } from "react";
import styles from "./LoginScreen.module.css";
import login_illustration from "../../assets/landingImg.png";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { setToken } from "../../features/authSlice";
import { useDispatch } from "react-redux";

const LoginScreen = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  const userData = {
    email: email,
    password: password,
  };

  const isFormValid = () => {
    if (ValidateEmail(email) && email !== "" && password !== "") {
      setIsValid(false);
      return true;
    } else {
      setIsValid(true);
      return false;
    }
  };

  function ValidateEmail(mail) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mail.match(mailformat)) {
      setIsValidEmail(false);
      return true;
    }
    setIsValidEmail(true);
    alert("You have entered an invalid email address!");
    return false;
  }

  const dispatch = useDispatch();

  const loginUser = () => {
    setLoading(true);
    axios
      .post(import.meta.env.VITE_PROD_URL + "login", userData)
      .then((response) => {
        localStorage.setItem("@jwt-token", response.data.token);
        localStorage.setItem(
          "@user-details",
          JSON.stringify(response.data.user)
        );
        dispatch(
          setToken({ type: "auth/setToken", payload: response.data.token })
        );
        setLoading(false);
        navigate("/dashboard", { replace: true });
      })
      .catch((err) => {
        setLoading(false);
        alert(err.message);
        console.error("loginUser error: ", err);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.left_section}>
        <img src={login_illustration} alt="" className={styles.left_img} />
      </div>
      <div className={styles.right_section}>
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
        <h2 className={styles.underline_effect}>User Log-in</h2>
        <form className={styles.form}>
          <TextField
            fullWidth
            required
            id="outlined-basic"
            label="Email Address"
            variant="outlined"
            value={email}
            onChange={(res) => setEmail(res.target.value)}
            error={isValidEmail}
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              value={password}
              onChange={(res) => setPassword(res.target.value)}
              type={showPassword ? "text" : "password"}
              required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={(event) => event.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <LoadingButton
            onClick={() => {
              if (isFormValid()) {
                loginUser();
              } else {
                setIsValid(true);
              }
            }}
            endIcon={<LoginIcon />}
            loading={loading}
            loadingPosition="end"
            variant="contained"
            type="submit"
          >
            <span>Login</span>
          </LoadingButton>
        </form>
        <div className={styles.no_account}>
          <h4>
            <Link to="/register">Don't have an account? Register now!</Link>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
