import { useState, useEffect } from "react";
import Link from "next/link";
import Modal from "react-modal";
import Add from "./Add";
import Edit from "./Edit";
import Delete from "./Delete";
import Share from "./Share";
import GenerateLines from "./GenerateLines";
import user from "../pages/user";
import axios from "axios";
import { API } from "../config";
import MediaQuery from "react-responsive";
import InfiniteScroll from "react-infinite-scroller";
import { getCookie } from "../helpers/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rating from "react-rating";

const NotebookPage = ({
  token,
  title,
  addModalTitle,
  listSkip,
  listLimit,
  link,
  route,
  loadMoreRoute,
  itemList,
  restaurantList,
  userList,
}) => {
  const [state, setState] = useState({
    // use in order item -> restaurant -> user
    lists: itemList
      ? itemList.items
      : restaurantList
      ? restaurantList.restaurants
      : userList.lists,
    success: "",
    currentModal: "",
    editData: 0,
    limit: listLimit,
    skip: listSkip,
    size: itemList
      ? itemList.items.length
      : restaurantList
      ? restaurantList.restaurants.length
      : userList.lists.length,
    listId: itemList
      ? itemList.restaurant._id
      : restaurantList
      ? restaurantList.list._id
      : userList.user.username,
  });
  const {
    lists,
    success,
    currentModal,
    editData,
    limit,
    skip,
    size,
    listId,
  } = state;

  const handleAddedList = (response) => {
    closeModal();
    setState({
      ...state,
      success: "Added",
      lists: [...lists, response.data],
    });
  };
  const handleEditList = (response) => {
    closeModal();
    let newList = [...lists];
    newList[editData] = response.data;
    setState({ ...state, success: "Edited", lists: newList });
  };
  const handleDeleteList = () => {
    closeModal();
    let newList = [...lists];
    newList.splice(editData, 1);

    setState({
      ...state,
      success: "Deleted",
      lists: newList,
    });
  };

  //Modal////////////////////
  Modal.setAppElement("#__next");
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const [modalIsOpen, setIsOpen] = React.useState(false);
  var subtitle;
  function openModal(e, modalType, index) {
    e.preventDefault();

    if (typeof index === "number") {
      setState({ ...state, currentModal: modalType, editData: index });
    } else {
      setState({ ...state, currentModal: modalType });
    }
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  const closeModal = () => {
    setIsOpen(false);
  };
  //RenderModal///////////////
  const renderModal = () => {
    switch (currentModal) {
      case "add":
        return (
          <Add
            listId={listId}
            closeModal={closeModal}
            handleAddedList={handleAddedList}
            token={`
        ${token}`}
            addModalTitle={addModalTitle}
            route={route}
            userList={userList}
            currentList={restaurantList ? restaurantList.list._id : ""}
            currentRestaurantList={itemList ? itemList.restaurant._id : ""}
          ></Add>
        );

      case "edit":
        return (
          <Edit
            handleEditList={handleEditList}
            editData={lists[editData]}
            token={`
        ${token}`}
            route={route}
          ></Edit>
        );

      case "share":
        return (
          <Share
            token={`${token}`}
            closeModal={closeModal}
            editData={lists[editData]}
            data={restaurantList ? "restaurant" : "list"}
          ></Share>
        );
      case "delete":
        return (
          <Delete
            route={route}
            editData={lists[editData]}
            handleDeleteList={handleDeleteList}
            token={`
        ${token}`}
          ></Delete>
        );

      default:
        return;
    }
  };
  /////////////////////////
  //////////////////////////

  //Generate List///////////

  const diableForRestaurantPage = (e) => {
    if (itemList) {
      e.preventDefault();
    }
  };

  const addContentItemOnHoverCSS = (index) => {
    return index === editData ? "NotebookPage_item--hover" : "";
  };

  const currentItemOnHover = (index) => {
    setState({
      ...state,
      editData: index,
    });
  };

  function displayList() {
    return lists.map((list, i) => {
      let cssNum = i + 1;
      return (
        <Link
          key={i}
          href={itemList ? "" : link}
          as={`/user/${restaurantList ? "restaurants" : "lists"}/${list.slug}`}
        >
          <a
            onClick={(e) => {
              diableForRestaurantPage(e);
            }}
            onMouseEnter={() => {
              currentItemOnHover(i);
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
                {list.rating ? (
                  <div className="NotebookPage_content-description--rating">
                    <Rating
                      fullSymbol={{
                        display: "inline-block",
                        borderRadius: "50%",
                        border: "5px double white",
                        width: "20px",
                        height: "20px",
                        backgroundColor: "black",
                      }}
                      emptySymbol={
                        <span className="Add_rating-emptyIcon"></span>
                      }
                      initialRating={list.rating}
                      readonly={true}
                    ></Rating>
                  </div>
                ) : (
                  <div className="" style={{ display: "none" }}></div>
                )}
              </div>
              <div className={`NotebookPage_content-description`}>
                <div className={`NotebookPage_content-description--title`}>
                  <p className="NotebookPage_title-text">
                    {`${list.name.toUpperCase()}`}
                  </p>
                </div>

                <div className={`NotebookPage_content-description--content`}>
                  {`${list.description}`}
                </div>
                <div className={`NotebookPage_content-description--buttons`}>
                  <div
                    onClick={(e) => {
                      openModal(e, "edit", i);
                    }}
                    className={`NotebookPage_content-description--buttons-edit`}
                  >
                    edit
                  </div>
                  <div
                    onClick={(e) => {
                      openModal(e, "delete", i);
                    }}
                    className={`NotebookPage_content-description--buttons-delete`}
                  >
                    delete
                  </div>

                  <div
                    onClick={(e) => {
                      openModal(e, "share");
                    }}
                    className={`NotebookPage_content-description--buttons-share`}
                  >
                    share
                  </div>
                </div>
              </div>
            </div>
          </a>
        </Link>
      );
    });
  }
  useEffect((params) => {
    console.log(state);
    console.log("item", itemList);
    console.log("userList", userList);
    console.log("restaurant", restaurantList);
  });

  return (
    <div className="NotebookPage">
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {renderModal()}
      </Modal>
      <div className="NotebookPage_header"></div>
      <GenerateLines num={40}></GenerateLines>

      <div className="NotebookPage_content--header">
        <div className="NotebookPage_content--header-title">{title}</div>
        <div className="NotebookPage_content--nav">
          <div
            onClick={(e) => {
              openModal(e, "add");
            }}
            className="NotebookPage_content--nav-add"
          >
            <FontAwesomeIcon icon={["fas", "plus"]} size="sm"></FontAwesomeIcon>
          </div>
        </div>
      </div>
      <div className="NotebookPage_content   Scroll Scroll_1">
        {displayList()}
      </div>
    </div>
  );
};

export default NotebookPage;
