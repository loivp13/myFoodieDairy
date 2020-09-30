import { useState, useEffect } from "react";

import Layout from "../../../components/Layout";
import axios from "axios";
import { API } from "../../../config";
import { getCookie } from "../../../helpers/auth";
import withUser from "../../withUser";
import withAdmin from "../../withAdmin";
import Link from "next/link";
import Router from "next/router";
import NotebookPage from "../../../components/NotebookPage";

const Restaurant = ({ token, itemList, listSkip, listLimit, query }) => {
  const confirmDelete = (e, id) => {
    e.preventDefault();
    console.log("delete", id);
    let answer = window.confirm("Are you sure you want to delete?");
    if (answer) {
      handleDelete(id);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API}/link/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("link delete success", response);
      Router.replace("/user");
    } catch (error) {
      console.log("link delete error", error);
    }
  };

  const listOfLinks = () => {
    return userLists.map((l, i) => {
      return (
        <div className="row alert alert-primary p-2" key={i}>
          <div className="col-md-8">
            <a href={l.url} target="_blank">
              <h5 className="pt-2">{l.title}</h5>
              <h6 className="pt-2 text-danger" style={{ fontSize: "12px" }}>
                {l.url}
              </h6>
            </a>
          </div>
          <div className="col-md-4 pt-2">
            <span className="pull-right">
              {`${moment(l.createdAt).fromNow()} by ${l.postedBy.name}`}
            </span>
          </div>
          <div className="col-md-12">
            <span className="badge text-dark">
              {l.type} / {l.medium}
            </span>
            {l.categories.map((c, i) => {
              return <span className="badge text-dark">{c.name}</span>;
            })}
            s <span className="badge text-secondary">{l.clicks} clicks</span>
            <Link href={`/user/link/${l._id}`}>
              <span className="badge text-success pull-right">Update</span>
            </Link>
            <span
              onClick={(e) => {
                confirmDelete(e, l._id);
              }}
              className="badge text-danger pull-right"
            >
              Delete
            </span>
          </div>
        </div>
      );
    });
  };

  useEffect((params) => {
    console.log(itemList);
  });
  return (
    <Layout>
      <NotebookPage
        title={`${itemList.restaurant.name}'s menu`}
        itemList={itemList}
        listSkip={listSkip}
        listLimit={listLimit}
        token={`${token}`}
        link={"/user/items"}
        addModalTitle={"item"}
        loadMoreRoute={`${API}/items`}
        route={"/item"}
      >
        Pages
      </NotebookPage>
    </Layout>
  );
};

Restaurant.getInitialProps = async ({ req, query }) => {
  // token, list, listSkip, listSize, listLimit
  let limit = 100;
  let skip = 0;
  let itemList;
  let token = getCookie("token", req);
  if (token) {
    try {
      const response = await axios.post(
        `${API}/restaurant/${query.restaurant}`,
        { limit, skip },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      itemList = response.data;
      console.log(response.data);
    } catch (error) {
      console.log("Restaurant list not found");
    }
    console.log(itemList);
    return { token, itemList, listSkip: skip, listLimit: limit };
  }
};

export default withUser(Restaurant);
