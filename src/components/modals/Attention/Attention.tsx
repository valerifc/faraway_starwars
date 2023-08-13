import React from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModalAttention,
  selectModalAttention,
} from "../../../features/modals/modalsSlice";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

const Attention = () => {
  const dispatch = useDispatch();
  const { open, title, context, closeBtnTitle } =
    useSelector(selectModalAttention);

  const handleClose = () => dispatch(closeModalAttention());

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{context}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{closeBtnTitle}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Attention;
