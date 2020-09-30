import Layout from "../../components/Layout";
import WelcomeUser from "../../components/WelcomeUser";
import UserSetting from "../../components/UserSetting";
import ShareLinksList from "../../components/ShareLinksList";
import GenerateLines from "../../components/GenerateLines";
import axios from "axios";
import { API } from "../../config";
import { getCookie } from "../../helpers/auth";
import withUser from "../withUser";
import withAdmin from "../withAdmin";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";

const User = ({ userList, token, userLinks, statistics }) => {
  const [state, setState] = useState({ currentComponent: "welcome" });

  const handleChangeCurrentComponent = (component) => {
    setState({ currentComponent: component });
  };

  const renderCurrentComponent = () => {
    switch (state.currentComponent) {
      case "welcome":
        return (
          <WelcomeUser
            userList={userList}
            statistics={statistics}
          ></WelcomeUser>
        );
      case "setting":
        return <UserSetting userList={userList} token={token}></UserSetting>;
      case "shared links":
        return <ShareLinksList statistics={statistics}></ShareLinksList>;
      default:
        return "";
    }
  };

  return (
    <Layout>
      <div className="User">
        <img
          className="User_images--lines"
          src="static/images/lines.png"
          alt=""
        />
        <div className="Lines">
          <GenerateLines num={40}></GenerateLines>
        </div>
        <div className="User_leftContainer">
          <div className="User_menu">
            <div className="User_menu--item">
              <div
                className="User_menu--item-welcome!"
                onClick={() => {
                  handleChangeCurrentComponent("welcome");
                }}
              >
                STATISTICS
              </div>
            </div>
            <div className="User_menu--item">
              <div
                className="User_menu--item-setting"
                onClick={() => {
                  handleChangeCurrentComponent("setting");
                }}
              >
                ACCOUNT SETTING
              </div>
            </div>
            <div className="User_menu--item">
              <div
                onClick={() => {
                  handleChangeCurrentComponent("shared links");
                }}
                className="User_menu--item-shareList"
              >
                SHARED LINKS
              </div>
            </div>
          </div>
        </div>
        <div className="User_rightContainer">{renderCurrentComponent()}</div>
        <div className="User_bottomContainer">
          <img
            className="User_bottomContainer-image1"
            src="static/images/let's eat.png"
            alt=""
          />
          <img
            className="User_bottomContainer-image2"
            src="static/images/asterisks.png"
            alt=""
          />
        </div>
      </div>
    </Layout>
  );
};

User.getInitialProps = async ({ query, req }) => {
  const token = getCookie("token", req);
  let response;
  if (token) {
    try {
      response = await axios.get(`${API}/statistic`, {
        headers: {
          authorization: `Bearer ${token}`,
          contentType: "application/json",
        },
      });
    } catch (err) {
      if (err) {
        console.log(err.response);
      }
    }
  }
  if (response) {
    return {
      statistics: response.data,
      token,
    };
  }
  return { user: "none" };
};

export default withUser(User);
