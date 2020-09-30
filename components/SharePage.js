import GenerateLines from "./GenerateLines";
import Link from "next/link";
import Rating from "react-rating";
import { useState, useEffect } from "react";

const SharePage = ({ pageInfo, pageItems, isList }) => {
  const [state, setState] = useState({ currentHoverIndex: 0 });

  const { currentHoverIndex } = state;

  const currentItemOnHover = (index) => {
    setState({
      ...state,
      currentHoverIndex: index,
    });
  };

  const disableLinkForRestaurantPage = (e) => {
    if (!isList) {
      e.preventDefault();
    }
  };

  const addContentItemOnHoverCSS = (index) => {
    return index === currentHoverIndex ? "NotebookPage_item--hover" : "";
  };

  const displayItems = () => {
    console.log(pageItems);
    return pageItems.map((list, i) => {
      return (
        <Link
          href={isList ? `/${list._id}` : ""}
          as={`/share/${pageInfo._id}/${list._id}`}
        >
          <a
            onMouseEnter={() => {
              currentItemOnHover(i);
            }}
            onClick={(e) => {
              disableLinkForRestaurantPage(e);
            }}
          >
            <div
              key={i}
              className={`NotebookPage_content_item ${addContentItemOnHoverCSS(
                i
              )}`}
            >
              <div className={`NotebookPage_content-image`}>
                <img
                  src={
                    list.image.url
                      ? list.image.url
                      : "https://foodiediary.s3.us-west-2.amazonaws.com/list/f593bd43-2a3b-4b2e-9b65-0cf1d0733f23.jpeg"
                  }
                  alt=""
                />
                <Rating
                  fullSymbol={{
                    display: "inline-block",
                    borderRadius: "50%",
                    border: "5px double white",
                    width: "20px",
                    height: "20px",
                    backgroundColor: "black",
                  }}
                  initialRating={list.rating}
                  emptySymbol={<span className="Add_rating-emptyIcon"></span>}
                  readonly={true}
                ></Rating>
              </div>
              <div className={`NotebookPage_content-description`}>
                <div className={`NotebookPage_content-description--title`}>
                  {`${list.name.toUpperCase()}`}
                </div>
                <div className={`NotebookPage_content-description--content`}>
                  {`${list.description}`}
                </div>
                <div
                  style={{ display: "none" }}
                  className="NotebookPage_content-description-rating"
                ></div>
              </div>
            </div>
          </a>
        </Link>
      );
    });
  };

  return (
    <div className="SharePage">
      <div className="SharePage_header"></div>
      <GenerateLines num={40}></GenerateLines>

      <div className="SharePage_content--header">
        <div className="SharePage_content--header-title">{pageInfo.name}</div>
      </div>
      <div className="SharePage_content   Scroll Scroll_1">
        {displayItems()}
      </div>
    </div>
  );
};

export default SharePage;
