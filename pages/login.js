import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import Layout from "../components/Layout";
import axios from "axios";
import { showSuccessMessage, showErrorMessage } from "../helpers/alerts";
import { API } from "../config";
import { authenticate, isAuth } from "../helpers/auth";

const Login = () => {
  const [state, setState] = useState({
    name: "",
    email: "loivp@yahoo.com",
    password: "123456",
    error: "",
    success: "",
    buttonText: "Login",
  });

  useEffect(() => {
    isAuth() && Router.push("/");
  }, []);

  const { name, email, password, error, success, buttonText } = state;

  const handleChange = (name) => (e) => {
    setState({
      ...state,
      [name]: e.target.value,
      error: "",
      success: "",
      buttonText: "Login",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, buttonText: "Login" });
    try {
      const response = await axios.post(`${API}/login`, {
        email,
        password,
      });
      console.log(response);
      authenticate(response, () => {
        isAuth() && isAuth().role === "admin"
          ? Router.push("/admin")
          : Router.push("/user/lists");
      });
    } catch (error) {
      console.log(error);
      setState({
        ...state,
        buttonText: "Login",
        error: error.response.data.error,
      });
    }
  };

  const loginForm = () => (
    <form className="Login_form" onSubmit={handleSubmit}>
      <div className="">
        <input
          className="Login_form--input"
          value={email}
          onChange={handleChange("email")}
          type="email"
          placeholder="EMAIL"
          required
        />
      </div>
      <div>
        <input
          className="Login_form--input"
          value={password}
          onChange={handleChange("password")}
          type="password"
          placeholder="PASSWORD"
          required
        />
      </div>

      <button className="Login_form-button--login">{buttonText}</button>
      <div className="Login_form-button">
        <Link href="/register">
          <a className="Login_form-button--register">Register</a>
        </Link>
        <Link href="/auth/password/forgot">
          <a className="Login_form-button--pw">Forgot Password</a>
        </Link>
      </div>
    </form>
  );
  return (
    <Layout>
      <div className="Login">
        <br />
        <h1>LOGIN</h1>
        {success && showSuccessMessage(success)}
        {error && showErrorMessage(error)}
        <br />
        {loginForm()}
      </div>
    </Layout>
  );
};

export default Login;
