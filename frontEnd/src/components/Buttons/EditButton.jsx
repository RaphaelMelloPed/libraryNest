import React from "react";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

export default function EditButtonModal({ link, id }) {
  return (
    <div>
      <Link to={`${link}${id}`}>
        <EditIcon sx={{ color: "green" }} />
      </Link>
    </div>
  );
}