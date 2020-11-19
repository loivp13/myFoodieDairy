import Head from "next/head";
import NProgress from "nprogress";
import Router from "next/router";
import { isAuth, logout } from "../helpers/auth";
import Navbar from "../components/Navbar";
import Notebook from "../components/Notebook";

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const Layout = ({ children }) => {
  return (
    <div className="Layout">
      <Head>
        <title>My Foodie Diary</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Covered+By+Your+Grace&display=swap"
          rel="stylesheet"
        ></link>
        <meta propterty="og:title" content="My Foodie Diary" key="title" />
        <meta charset="UTF-8"/>
        <meta name="description" content="Loi Van Pham's portfolio showing all big projects"/>
        <meta name="keywords" content="Portfolio, projects, react, NextJS, web development, Javascript, CSS3, DigitalOcean, SEO, NodeJS, Express,Front End, Back End"/>
        <meta name="author" content="loivp"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Head>
      <img src="/static/images/ayce.png" alt="" className="Layout_images--1" />
      {/* <img
        src="/static/images/kitchen doodles/2.png"
        alt=""
        className="Layout_images--2"
      /> */}
      <img src="/static/images/boba.png" alt="" className="Layout_images--3" />
      {/* <img
        src="/static/images/kitchen doodles/4.png"
        alt=""
        className="Layout_images--4"
      /> */}
      <img
        src="/static/images/tacotues.png"
        alt=""
        className="Layout_images--5"
      />
      {/* <img
        src="/static/images/kitchen doodles/6.png"
        alt=""
        className="Layout_images--6"
      /> */}
      <img
        src="/static/images/bobarun.png"
        alt=""
        className="Layout_images--7"
      />
      {/* <img
        src="/static/images/kitchen doodles/8.png"
        alt=""
        className="Layout_images--8"
      /> */}
      <img
        src="/static/images/brunch.png"
        alt=""
        className="Layout_images--9"
      />
      <Navbar></Navbar>
      <div className="Layout">
        <Notebook>{children}</Notebook>
      </div>
    </div>
  );
};

export default Layout;
