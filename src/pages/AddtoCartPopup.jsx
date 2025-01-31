import React from "react";
import { Snackbar } from "@mui/material";

function AddToCartPopup({ onClose }) {
  return (
    <Snackbar
      open={true} // You can manage the open state via props
      autoHideDuration={3000} // Adjust the duration as needed
      onClose={onClose} // Call onClose function to close the popup
      message="Product added to cart"
    />
  );
}

export default AddToCartPopup;
