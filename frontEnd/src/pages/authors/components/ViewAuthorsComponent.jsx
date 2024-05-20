import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import { updateAuthor } from "../../../../requests_api/authors";
import { deleteAuthor } from "../../../../requests_api/authors";
import DeleteButton from "../../../components/Buttons/DeleteButton";
import EditButtonModal from "../../../components/Buttons/EditButton";

export default function ViewAuthorsComponent({ id, name }) {
  const handleDelete = async () => {
    try {
      await deleteAuthor(id);
      notifySuccess();
    } catch (error) {
      console.error("Error deleting author:", error.message);
      notifyFail(error.message);
    }
  };

  const [userData, setUserData] = useState("");

  useEffect(() => {
    const userDataFromStorage = localStorage.getItem("user");
    if (userDataFromStorage) {
      const parsedUserData = JSON.parse(userDataFromStorage);
      setUserData(parsedUserData);
    }
  }, []);

  const notifySuccess = () => {
    toast.success('Success!', {
      position: "bottom-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      onClose: () => navigate("/authors")
      });
  };

  const notifyFail = (message) => {
    toast.error(message, {
      position: "bottom-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      onClose: () => window.location.reload()
      });
  };

  return (
    <div
      className="max-w-sm bg-gray-800 border rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      style={{ width: "15rem" }}
    >
      <div className="p-5">
        <h5 className=" flex justify-center mb-2 text-1xl tracking-tight text-white">
          {name}
        </h5>
        {userData.admin === "1" && (
          <div className="flex justify-center pt-5">
            <DeleteButton deleteFunction={handleDelete} />
            <EditButtonModal link="/authors/update/" id={id} />
          </div>
        )}
      </div>
    </div>
  );
}
