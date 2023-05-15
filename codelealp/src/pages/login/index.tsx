import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/images/logo.png";
import { setUserData } from "../../Actions/user/index";
import {LoginDiv} from "./style"

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsernameValue] = useState("");
  const [password, setPassword] = useState("");
  const isButtonDisabled = username.length < 3 || password.length < 3;

  // Load user data from session storage into Redux store on page refresh
  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      const action = setUserData(userData);
      dispatch(action);
    }
  }, [dispatch]);

  const handleLogin = (e: any) => {
    e.preventDefault();

    // Set user data in Redux store and session storage
    const userData = {
      username,
      token: "random_token_string" // or set it to a default value
    };
    const action = setUserData(userData);
    dispatch(action);
    sessionStorage.setItem("userData", JSON.stringify(userData));

    // Redirect to the home page
    window.location.href = "/posts";
  };

  return (
    <LoginDiv>
      <ToastContainer />     
      <img src={logo} alt="" />
      <form onSubmit={handleLogin}>
        <div>
          <label>User name:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsernameValue(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={isButtonDisabled}>
          Login
        </button>
      </form>
    </LoginDiv>
  );
};

export default Login;
