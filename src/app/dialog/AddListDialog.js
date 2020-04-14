import React from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const AddListDialog = ({ open, handleClose, addList }) => {
  const [title, setTitle] = React.useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add Movie List</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a new movie list, please enter the name of the list, and press
          on button 'ADD LIST'
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="List Title"
          type="text"
          onChange={handleTitleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={title ? () => addList(title) : handleClose}
          color="primary"
        >
          Add List
        </Button>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddListDialog;
