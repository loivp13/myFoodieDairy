import { withRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import { showSuccessMessage, showErrorMessage } from "../../../helpers/alerts";
import { API } from "../../../config";
import Layout from "../../../components/Layout";

const ForgotPassword = () => {
  const [state, setState] = useState({
    email: "",
    buttonText: "Forgot Password",
    success: "",
    error: "",
  });
  const { email, buttonText, success, error } = state;
  const handleChange = (e) => {
    setState({ ...state, email: e.target.value, error: "", success: "" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API}/forgot-password`, { email });
      setState({
        ...state,
        email: "",
        buttonText: "Done",
        success: response.data.message,
      });
    } catch (error) {
      setState({
        ...state,
        buttonText: "Forgot Password",
        error: error.response.data.error,
      });
    }
  };
  const passwordForgotForm = () => {
    return (
      <form className="ForgotPW_form" onSubmit={handleSubmit}>
        <div className="">
          <input
            type="email"
            className="ForgotPW_form--email"
            onChange={handleChange}
            value={email}
            placeholder="Type your email"
            required
          />
        </div>
        <div className="ForgotPW_form--button">
          <button className="">{buttonText}</button>
        </div>
      </form>
    );
  };
  return (
    <Layout>
      <div className="ForgotPW">
        <h1 className="ForgotPW_header">Forgot Password</h1>
        <br />
        {success && showSuccessMessage(success)}
        {error && showErrorMessage(error)}
        {passwordForgotForm()}
      </div>
    </Layout>
  );
};

export default ForgotPassword;
