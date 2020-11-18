import Layout from "../components/Layout";
import axios from "axios";
import { API } from "../config";
import Link from "next/link";
import { useEffect, useState } from "react";
import Slideshow from '../components/Slideshow';


const Home = () => {

let [state,setState] = useState({width: 0,height:0});

useEffect(() => {
    const updateWindowDimensions =(e) => {
      setState({ width: window.innerWidth, height: window.innerHeight });
    }
      updateWindowDimensions();
      window.addEventListener('resize', updateWindowDimensions);

      return () => {
      window.removeEventListener('resize', updateWindowDimensions);

    
  }

},[])


const renderResponsiveSlideshow = () => {
  console.log(state)
  if(state.width < 900){
    return <Slideshow
        imgs = {
          [
            <img
            className="MFD_logo-image"
            src="/static/images/myfoodiediaryAddPageTab.png"
            alt=""
            />,
            <img
            className="MFD_logo-image"
            src="/static/images/myfoodiediaryListPageTab.png"
            alt=""
            />,
            <img
            className="MFD_logo-image"
            src="/static/images/myfoodiediarySharePageTab.png"
            alt=""
            />,
            <img
            className="MFD_logo-image"
            src="/static/images/myfoodiediaryAddPageTab.png"
            alt=""
            />,
          ]

      }
      ></Slideshow>
  } else if( state.width  < 700){
  return <Slideshow
        imgs = {
          [
            <img
            className="MFD_logo-image"
            src="/static/images/myfoodiediaryAddPagePhone.png"
            alt=""
            />,
            <img
            className="MFD_logo-image"
            src="/static/images/myfoodiediaryListPagePhone.png"
            alt=""
            />,
            <img
            className="MFD_logo-image"
            src="/static/images/myfoodiediarySharePagePhone.png"
            alt=""
            />,
             <img
            className="MFD_logo-image"
            src="/static/images/myfoodiediaryAddPagePhone.png"
            alt=""
            />,
          ]

      }
      ></Slideshow>
  } else {
    return <Slideshow
        imgs = {
          [
            <img
            className="MFD_logo-image"
            src="/static/images/myfoodiediaryAddPageDesktop.png"
            alt=""
            />,
            <img
            className="MFD_logo-image"
            src="/static/images/myfoodiediaryListPageDesktop.png"
            alt=""
            />,
            <img
            className="MFD_logo-image"
            src="/static/images/myfoodiediarySharePageDesktop.png"
            alt=""
            />,
            <img
            className="MFD_logo-image"
            src="/static/images/myfoodiediaryAddPageDesktop.png"
            alt=""
            />,
          ]

      }
      ></Slideshow>
  }

}

  return (

    <Layout>
      <img
        className="MFD_logo-image"
        src="/static/images/MFDLogo1.jpg"
        alt=""
      />
      <div className="Slideshow_container">
      {renderResponsiveSlideshow()}
      </div>
    </Layout>
  );
};

export default Home;
