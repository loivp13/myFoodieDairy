import { useState, useEffect } from "react";
import Layout from "./Layout";
import axios from "axios";
import { API } from "../config";
import { showErrorMessage, showSuccessMessage } from "../helpers/alerts";
import { getCookie, isAuth } from "../helpers/auth";
import Resizer from "react-image-file-resizer";
import { CapFirstLetter } from "../components/Utilities/StringModification";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Add = ({
  token,
  handleAddedList,
  addModalTitle,
  listId,
  userList,
  itemList,
  route,
  currentList,
  currentRestaurantList,
}) => {
  const [state, setState] = useState({
    name: "",
    description: "",
    image: "",
    error: "",
    success: "",
    imageUploadButtonName: "Upload Image",
    rating: 3,
    initialRating: 3,
    checkedboxes: [currentList],
  });

  const {
    name,
    description,
    success,
    error,
    imageUploadButtonName,
    image,
    rating,
    initialRating,
    checkedboxes,
  } = state;

  const handleChange = (name) => (e) => {
    //USED WHEN SENDING FILES USING FORM DATA
    // const value = name === "image" ? e.target.files[0] : e.target.value;
    // const imageName =
    //   name === "image" ? event.target.files[0].name : "Upload image";
    // formData.set(name, value);
    setState({
      ...state,
      [name]: e.target.value,
      error: "",
      success: "",
    });
  };

  const handleImage = (e) => {
    let fileInput = false;
    if (e.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      Resizer.imageFileResizer(
        e.target.files[0],
        300,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          setState({ ...state, image: uri, success: "", error: "" });
        },
        "base64"
      );
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API}${route}`,
        {
          name,
          description,
          image,
          rating,
          listId,
          rating,
          list: currentRestaurantList ? currentRestaurantList : checkedboxes,
        },
        {
          headers: {
            Authorization: `Bearer ${token.trim()}`,
          },
        }
      );
      setState({
        ...state,
        success: "Success",
        error: "",
      });
      handleAddedList(response);
    } catch (error) {
      console.log(error);
      if (error.response) {
        setState({
          ...state,
          buttonText: "Created",
          error: error.response.data.error,
        });
      }
    }
  };
  //////RATING /////////////////////////////
  const handleRatingClick = (rating) => {
    console.log(rating);
    setState({ ...state, rating, initialRating: rating });
  };

  const renderRating = () => {
    if (addModalTitle !== "list") {
      return (
        <Rating
          className="Add_rating"
          onClick={handleRatingClick}
          placeholderRating={3}
          initialRating={initialRating}
          // fullSymbol={
          //   <img
          //     src="/static/images/online images/fadedCircleStar.jpg"
          //     className="Add_rating-icon"
          //   />
          // }
        ></Rating>
      );
    } else {
      return null;
    }
  };

  //link Add form
  //RENDER LIST

  const handleOnCheckboxChange = (e, value) => {
    let index = checkedboxes.indexOf(value);
    console.log(index);
    if (index > -1) {
      let newArray = [...checkedboxes];
      newArray.splice(index, 1);
      setState({ ...state, checkedboxes: [...newArray] });
    } else {
      setState({ ...state, checkedboxes: [...checkedboxes, value] });
    }
  };

  const addCheckedBoxCSS = (id) => {
    if (checkedboxes.includes(id)) {
      return "Add_form--dropdown--list-itemChecked";
    } else {
      return "";
    }
  };

  const renderCheckesIcon = (id) => {
    if (checkedboxes.includes(id)) {
      return (
        <FontAwesomeIcon icon={["fas", "check"]} size="sm"></FontAwesomeIcon>
      );
    } else {
      return "";
    }
  };
  const renderListDropDown = () => {
    if (itemList) {
    } else if (currentList) {
      return userList.lists.map((item) => {
        return (
          <>
            <label
              className={`Add_form--dropdown--list-item ${addCheckedBoxCSS(
                item._id
              )}`}
            >
              <span className="Add_form--image-plus">
                {renderCheckesIcon(item._id)}
              </span>{" "}
              {item.name}{" "}
              <input
                hidden={true}
                checked={checkedboxes.includes(item._id)}
                name={item.name}
                key={item.name}
                value={item._id}
                type="checkbox"
                onChange={(e) => {
                  handleOnCheckboxChange(e, item._id);
                }}
              />
            </label>
          </>
        );
      });
    } else {
      return null;
    }
  };

  const renderCheckedBoxes = () => {
    let results = checkedboxes.map((checkedboxId, i) => {
      if (userList) {
        return userList.lists.map((item, i) => {
          if (checkedboxId === item._id) {
            return (
              <div key={i} className="Add_form--dropdown--selectedBox-item">
                {item.name}
              </div>
            );
          } else {
            null;
          }
        });
      }
    });
    console.log(results);
    return results;
  };

  const submitLinkForm = () => {
    return (
      <form className="Add_form" onSubmit={handleSubmit}>
        <div className="Add_form--name">
          <input
            type="text"
            className="Add_form--name-input"
            onChange={handleChange("name")}
            value={name}
            placeholder="Name"
            maxLength="100"
          />
        </div>
        <div className="Add_form--description">
          <textarea
            type="text"
            className="Add_form--description--textarea"
            onChange={handleChange("description")}
            value={description}
            placeholder="Description"
            maxLength="135"
          />
        </div>
        <div className="Add_form-rating">{renderRating()}</div>
        <div className="Add_form--dropdown">
          {addModalTitle !== "list" && !currentRestaurantList
            ? "List(s) to add restaurant to."
            : ""}
          <div className="Add_form--dropdown--selectedBox">
            {renderCheckedBoxes()}
          </div>
          <div className="Add_form--dropdown--list">
            {addModalTitle !== "list" && !currentRestaurantList ? (
              <>
                <span className="Add_form--image-plus">
                  <FontAwesomeIcon
                    icon={["fas", "plus"]}
                    size="sm"
                  ></FontAwesomeIcon>
                </span>{" "}
                Add Additonal List
              </>
            ) : (
              ""
            )}
            <div className="Add_form--dropdown--list-content">
              {renderListDropDown()}
            </div>
          </div>
        </div>
        <div className="Add_form--image">
          <label htmlFor="image" className="Add_form--image--label">
            <span className="Add_form--image-plus">
              <FontAwesomeIcon
                icon={["fas", "plus"]}
                size="sm"
              ></FontAwesomeIcon>{" "}
              {imageUploadButtonName}
            </span>
            <input
              id="image"
              onChange={handleImage}
              type="file"
              accept="image/*"
              className="Add_form--image--input"
              hidden
            />
          </label>
        </div>
        <div className="Add_form--buttons">
          <button className="Add_form--button">ADD</button>
        </div>
      </form>
    );
  };

  return (
    <div className="Add">
      <div className="">
        <div className="col-md-12">
          <h1>Add New {CapFirstLetter(addModalTitle)}</h1>
          <br />
        </div>
      </div>
      <div className="Add_card">
        <div className="">
          {success && showSuccessMessage(success)}
          {error && showErrorMessage(error)}
          {submitLinkForm()}
        </div>
      </div>
    </div>
  );
};

export default Add;
