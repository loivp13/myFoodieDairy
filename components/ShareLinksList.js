import React from "react";
import Link from "next/link";

export default function ShareLinksList({ statistics }) {
  console.log(statistics.shareList);
  const renderShareList = () => {
    if (statistics.shareList.length > 0) {
      return statistics.shareList.map((item, i) => {
        return (
          <Link href={`/share/${item._id}`} key={i}>
            <a className="ShareList_item">{item.shareItem.name}</a>
          </Link>
        );
      });
    } else {
      return <div className="">Not sharing any links right now.</div>;
    }
  };

  return (
    <div className="ShareLinksList">
      <div className="ShareLinksList_header">Lists and restaurant sharing:</div>
      {renderShareList()}
    </div>
  );
}
