import * as React from "react";
import Button from "@mui/material/Button";

export default function BasicButtons({ title, handleAction }) {
  return (
    <button
      className="btn-primary btn-detail add-item-button-transition"
      onClick={handleAction}
    >
      {title}
    </button>
  );
}
