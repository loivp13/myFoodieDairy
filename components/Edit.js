import { useState } from "react";
import { showSuccessMessage, showErrorMessage } from "../helpers/alerts";
import axios from "axios";
import { API } from "../config";
import Resizer from "react-image-file-resizer";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Edit({ editData, token, handleEditList, route }) {
  console.log(editData);
  const [state, setState] = useState({
    name: editData.name,
    description: editData.description,
    image: "",
    error: "",
    success: "",
    imageButtonName: "Upload new image",
    rating: editData.rating,
  });

  const {
    name,
    description,
    success,
    error,
    imageButtonName,
    image,
    rating,
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
    setState(e.target.files[0].name);
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
      const response = await axios.put(
        `${API}${route}/${editData.slug}`,
        { name, description, image, rating },
        {
          headers: {
            Authorization: `Bearer ${token.trim()}`,
          },
        }
      );
      setState({
        ...state,
        success: "Updated!",
        error: "",
      });
      handleEditList(response);
    } catch (error) {
      console.log("--link submit error-- ", error);
      setState({
        ...state,
        buttonText: "Created",
        error: "Error occured editing list",
      });
    }
  };

  const handleRatingClick = (rating) => {
    setState({ ...state, rating, initialRating: rating });
  };

  //link Add form
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
        {rating ? (
          <Rating
            className="Add_rating"
            onClick={handleRatingClick}
            initialRating={rating}
          ></Rating>
        ) : (
          ""
        )}
        <div className="Add_form--image">
          <label htmlFor="image" className="Add_form--image--label">
            <span className="Add_form--image-plus">
              <FontAwesomeIcon
                icon={["fas", "plus"]}
                size="sm"
              ></FontAwesomeIcon>
            </span>{" "}
            {imageButtonName}
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
          <button className="Add_form--button">Save</button>
        </div>
      </form>
    );
  };

  return (
    <div className="Add">
      <div className="">
        <div className="col-md-12">
          <h1>Edit Your List</h1>
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
}
