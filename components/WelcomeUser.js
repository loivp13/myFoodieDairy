import React from "react";
import Link from "next/link";

export default function WelcomeUser({ userList, statistics }) {
  const renderHaveList = () => {
    if (userList.lists.length > 0) {
      return (
        <div className="WelcomeUser_list">
          <div className="WelcomeUser_item">
            <span className="Util_boldFont">Total Numbers of Lists:</span>{" "}
            {statistics.list.length}
          </div>
          <div className="WelcomeUser_item">
            <span className="Util_boldFont">Total Numbers of Restaurants:</span>{" "}
            {statistics.restaurant.length}
          </div>
          <div className="WelcomeUser_item">
            <span className="Util_boldFont">Total Numbers of Items:</span>{" "}
            {statistics.item.length}
          </div>
          <div className="WelcomeUser_item">
            <span className="Util_boldFont">
              Current Numbers of Shared Links:
            </span>{" "}
            {statistics.shareList.length}{" "}
          </div>
        </div>
      );
    } else {
      return (
        <Link href="/user/lists">
          <a className="WelcomeUser_createList">Create a new list</a>
        </Link>
      );
    }
  };

  return (
    <div className="WelcomeUser">
      <div className="WelcomeUser_header">{renderHaveList()}</div>
    </div>
  );
}
