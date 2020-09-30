import { useState, useEffect } from "react";
import Button from "./Button";
import { useRouter } from "next/router";
import axios from "axios";
import { API, DOMAIN } from "../config";
import Link from "next/link";

const Share = ({ closeModal, editData, data, token }) => {
  const [state, setState] = useState({ status: "not submitted", link: "" });

  const statusChange = (status) => {
    setState({ ...state, status: status, link: "" });
  };
  const { status, link } = state;
  const router = useRouter();
  useEffect(() => {
    console.log(editData);
  });
  const generateShareLink = async () => {
    setState({ ...state, status: "submitting" });
    try {
      const response = await axios.post(
        `${API}/share`,
        {
          type: data,
          shareItemId: editData._id,
          name: editData.name,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
            contentType: "application/json",
          },
        }
      );
      setState({
        ...state,
        status: "created",
        link: `${DOMAIN}/share/${response.data._id}`,
      });
    } catch (err) {
      if (err) {
        console.log(err);
        setState({ ...state, status: "error" });
      }
    }
  };

  const renderButtons = () => {
    switch (status) {
      case "submitting":
        return (
          <Button
            cssClass="Share_button--confirm"
            text="Generating link"
          ></Button>
        );
      case "created":
        return (
          <a target="_blank" href={link}>
            {link}
          </a>
        );
      default:
        return (
          <>
            <Button
              closeModal={generateShareLink}
              cssClass="Share_button--accept "
              text="Yes!"
            ></Button>
            <Button
              closeModal={closeModal}
              cssClass="Share_button--deny "
              text="No"
            ></Button>
          </>
        );
    }
  };

  const renderOnLoadComponent = (params) => {
    return (
      <>
        <div className="Share_text">
          {" "}
          Would you like to create a share link?
        </div>
        <div className="Share_buttons">{renderButtons()}</div>
      </>
    );
  };

  const renderGeneratedLinkComponent = (params) => {
    return (
      <>
        <div className="Share_text">Link will expire in 12 hours</div>
        <div className="Share_link">{link}</div>
      </>
    );
  };

  return (
    <div className="Share">
      {status === "error" ? (
        <div className="">
          Error occured while generating link, please try again.
        </div>
      ) : null}
      {link ? renderGeneratedLinkComponent() : renderOnLoadComponent()}
    </div>
  );
};

export default Share;
