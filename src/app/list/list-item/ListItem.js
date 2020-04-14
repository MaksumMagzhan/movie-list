import React from "react";

import "./ListItem.scss";

const ListItem = ({ title, movieCount }) => {
  return (
    <div className="list-item">
      <p className="list-item__title">Title: {title}</p>
      <p className="list-item__movies">Movies: {movieCount}</p>
    </div>
  );
};

export default ListItem;
