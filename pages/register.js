import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import Router from "next/router";
import { showSuccessMessage, showErrorMessage } from "../helpers/alerts";
import { API } from "../config";
import { isAuth } from "../helpers/auth";

const Register = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: "",
    buttonText: "Register",
    loadedCategories: [],
    categories: [],
  });
  const {
    name,
    email,
    password,
    error,
    success,
    buttonText,
    loadedCategories,
    categories,
  } = state;

  useEffect(() => {
    isAuth() && Router.push("/");
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const response = await axios.get(`${API}/categories`);
    console.log(response);
    setState({ ...state, loadedCategories: response.data });
  };
  const handleToggled = (c) => () => {
    // show categories > checkbox
    const clickedCategory = categories.indexOf(c);
    const all = [...categories];

    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }
    setState({ ...state, categories: all, success: "", error: "" });
  };

  const showCategories = () => {
    return (
      loadedCategories &&
      loadedCategories.map((c, i) => {
        return (
          <li className="list-unstyled" key={i}>
            <input
              type="checkbox"
              onChange={handleToggled(c._id)}
              className="mr-2"
            />
            <label htmlFor="" className="from-check-label">
              {c.name}
            </label>
          </li>
        );
      })
    );
  };

  const handleChange = (name) => (e) => {
    setState({
      ...state,
      [name]: e.target.value,
      error: "",
      success: "",
      buttonText: "Register",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, buttonText: "Registering" });
    try {
      const response = await axios.post(`${API}/register`, {
        name,
        email,
        password,
        categories,
      });
      console.log(response);
      setState({
        ...state,
        name: "",
        email: "",
        password: "",
        buttonText: "Submitted",
        success: response.data.message,
      });
    } catch (error) {
      console.log(error);
      setState({
        ...state,
        buttonText: "Register",
        error: error.response.data.error,
      });
    }
  };

  const registerForm = () => (
    <form className="Register_form" onSubmit={handleSubmit}>
      <div className="">
        <input
          value={name}
          onChange={handleChange("name")}
          type="text"
          className="Register_form--name"
          placeholder="Type your name"
          required
        />
      </div>
      <div className="form-group">
        <input
          value={email}
          onChange={handleChange("email")}
          type="email"
          className="Register_form--email"
          placeholder="Type your email"
          required
        />
      </div>
      <div className="form-group">
        <input
          value={password}
          onChange={handleChange("password")}
          type="password"
          className="Register_form--password"
          placeholder="Type your password"
          required
        />
      </div>
      <div className="form-group">
        <button className="Register_form--button">{buttonText}</button>
      </div>
    </form>
  );
  return (
    <Layout>
      <div className="Register">
        <br />
        <h1 className="Register_header">Register</h1>
        {success && showSuccessMessage(success)}
        {error && showErrorMessage(error)}
        <br />
        {registerForm()}
      </div>
    </Layout>
  );
};

export default Register;
