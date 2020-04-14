import React from "react";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";

import { getList, addNewList } from "../../services/movies";

import ListItem from "./list-item/ListItem";
import AddListDialog from "../dialog/AddListDialog";

import "./Lists.scss";

const Lists = () => {
  const [list, setList] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setList(getList());
  }, []);

  const addList = (title) => {
    const newList = {
      title,
      movies: [],
      id: list.length + 1,
    };
    setList(addNewList(newList));
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="lists container">
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add List
      </Button>
      <div className="lists__items">
        {list.length &&
          list.map((item) => {
            return (
              <Link
                key={item.id}
                to={`/list/${item.id}`}
                style={{ textDecoration: "none" }}
              >
                <ListItem
                  title={item.title}
                  movieCount={item.movies.length}
                ></ListItem>
              </Link>
            );
          })}
      </div>
      <AddListDialog
        open={open}
        handleClose={handleClose}
        addList={addList}
      ></AddListDialog>
    </div>
  );
};

export default Lists;
