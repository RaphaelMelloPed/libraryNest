import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DeleteButton({ deleteFunction }) {
  const onClickHandler = async (e) => {
    e.preventDefault();
    try {
      await deleteFunction();
      console.log("Delete with success");
    } catch (error) {
      console.error("Error calling API:", error.message);
    }
  };

  return (
    <DeleteIcon
      onClick={onClickHandler}
      sx={{ color: "red", cursor: "pointer" }}
    />
  );
}
