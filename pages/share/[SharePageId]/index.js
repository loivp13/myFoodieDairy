import SharePage from "../../../components/SharePage";
import Layout from "../../../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../config";

const Share = ({ pageInfo, pageItems, isList }) => {
  return (
    <Layout>
      <SharePage
        pageInfo={pageInfo}
        pageItems={pageItems}
        isList={isList}
      ></SharePage>
    </Layout>
  );
};

Share.getInitialProps = async ({ query }) => {
  let { SharePageId } = query;
  try {
    const response = await axios.get(`${API}/share/${SharePageId}`);

    const { data } = response;

    return {
      pageInfo: data.list ? data.list : data.restaurant,
      pageItems: data.items ? data.items : data.restaurant,
      isList: data.list ? true : false,
    };
  } catch (err) {
    console.log(err);
    return {
      pageInfo: { name: "Unfound" },
      pageItems: [],
      isList: false,
    };
  }
};

export default Share;
