import Layout from "../../../components/Layout";
import axios from "axios";
import { API } from "../../../config";
import { getCookie } from "../../../helpers/auth";
import withUser from "../../withUser";
import withAdmin from "../../withAdmin";
import Link from "next/link";
import Router from "next/router";
import NotebookPage from "../../../components/NotebookPage";
import user from "..";

const List = ({
  token,
  userList,
  restaurantList,
  listSkip,
  listLimit,
  query,
}) => {
  return (
    <Layout>
      <NotebookPage
        title={restaurantList.list.name}
        userList={userList}
        restaurantList={restaurantList}
        listSkip={listSkip}
        listLimit={listLimit}
        token={`${token}`}
        link={"/user/restaurant"}
        addModalTitle={"restaurant"}
        route={"/restaurant"}
        loadMoreRoute={`${API}/restaurants`}
      >
        Pages
      </NotebookPage>
    </Layout>
  );
};

List.getInitialProps = ({ req, query }) => {
  let token = getCookie("token", req);
  let limit = 100;
  let skip = 0;
  if (token) {
    function getRestaurantList() {
      return axios.post(
        `${API}/list/${query.list}`,
        { limit, skip },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
    function getUserList() {
      return axios.get(`${API}/user`, {
        headers: {
          authorization: `Bearer ${token}`,
          contentType: "application/json",
        },
      });
    }

    return Promise.all([getRestaurantList(), getUserList()])
      .then((response) => {
        return {
          token,
          listSkip: skip,
          listLimit: limit,
          userList: response[1].data,
          restaurantList: response[0].data,
          query: query.list,
        };
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  }
};

export default withUser(List);
