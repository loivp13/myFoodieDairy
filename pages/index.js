import Layout from "../components/Layout";
import axios from "axios";
import { API } from "../config";
import Link from "next/link";
import { useEffect, useState } from "react";

const Home = () => {
  return (
    <Layout>
      <img
        className="MFD_logo-image"
        src="/static/images/MFDLogo1.jpg"
        alt=""
      />
    </Layout>
  );
};

export default Home;
