import axios from "axios";
import { API } from "../config";
import { getCookie } from "../helpers/auth";
import { Children } from "react";

const WithUser = (Page) => {
  const WithAuthUser = (props) => <Page {...props} />;

  WithAuthUser.getInitialProps = async (context) => {
    const token = getCookie("token", context.req);
    let userList = null;
    if (token) {
      try {
        console.log("getting withAuthUser initialProps");
        const res = await axios.get(`${API}/user`, {
          headers: {
            authorization: `Bearer ${token}`,
            contentType: "application/json",
          },
        });
        userList = res.data;
      } catch (error) {
        if (error.response) {
          console.log("error with Auth User");
          if (error.response.status === 401) {
            return (user = null);
          }
        }
      }
    }
    if (userList === null) {
      //redirect
      context.res.writeHead(302, {
        Location: "/",
      });
      context.res.end();
    } else {
      return {
        ...(Page.getInitialProps ? await Page.getInitialProps(context) : {}),
        userList,
        token,
        listSkip: 0,
        listLimit: 100,
      };
    }
  };

  return WithAuthUser;
};

export default WithUser;
