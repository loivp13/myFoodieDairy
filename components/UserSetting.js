import React from "react";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import axios from "axios";
import { getCookie } from "../helpers/auth";
import { API } from "../config";

export default function UserSetting({ userList, token }) {
  const [state, setState] = useState({
    name: userList.user.name,
    password: "*********",
    inputChange: false,
  });
  const { name, password, inputChange } = state;
  console.log(userList);

  const handleInputChange = (e, type) => {
    setState({ ...state, [type]: e.target.value, inputChange: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(
      `${API}/user`,
      {
        name,
        password: inputChange ? password : null,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
          contentType: "application/json",
        },
      }
    );
  };

  const handleOnInputFocus = (e) => {
    e.target.select();
  };

  const renderSubmitButton = () => {
    if (true) {
      return <button className="UserSetting_form-button">Save</button>;
    } else return null;
  };

  return (
    <div className="UserSetting">
      <form className="UserSetting_form" onSubmit={handleSubmit}>
        <div className="UserSetting_form-input">
          Name:
          <input
            type="text"
            className
            value={name}
            onChange={(e) => {
              handleInputChange(e, "name");
            }}
          />
        </div>
        <div className="UserSetting_form-input">
          Password:
          <input
            type="password"
            className
            value={password}
            onFocus={handleOnInputFocus}
            onChange={(e) => {
              handleInputChange(e, "password");
            }}
          />
        </div>

        <div className="UserSetting_joinDate">
          Member Since:{" "}
          <Moment format="MM/DD/YYYY">{userList.user.createdAt}</Moment>
        </div>
        {/* {renderSubmitButton()} */}
      </form>
    </div>
  );
}
