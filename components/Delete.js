import { useState } from "react";
import axios from "axios";
import { API } from "../config";

export default function Delete({ editData, handleDeleteList, token, route }) {
  const [state, setState] = useState({});

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${API}${route}/${editData.slug}`,
        {
          headers: {
            Authorization: `Bearer ${token.trim()}`,
          },
        },
        {
          slug: editData.slug,
        }
      );
      handleDeleteList();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Delete">
      <div className="Delete_content">
        <div className="Delete_content--header">
          Are you sure you want to delete{" "}
          <span className="Delete_listname">{editData.name} </span>list?
        </div>
        <div className="Delete_content--button" onClick={handleDelete}>
          Confirm
        </div>
      </div>
    </div>
  );
}
