import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import DeleteButton from "../../../components/Buttons/DeleteButton";
import EditButtonModal from "../../../components/Buttons/EditButton";
import { deleteCategories } from "../../../../requests_api/categories";
import { updateCategories } from "../../../../requests_api/categories";

export default function ViewCategoryComponent({ id, name }) {
  const handleDelete = async () => {
    try {
      await deleteCategories(id);
      notifySuccess();
    } catch (error) {
      console.error("Error deleting category:", error);
      notifyFail('Something went wrong!');
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
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      onClose: () => window.location.reload()
      });
  };

  const notifyFail = () => {
    toast.error('Something went wrong!', {
      position: "top-center",
      autoClose: 3000,
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
    <>
      <div
        className="max-w-sm bg-gray-800 border rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        style={{ width: "15rem" }}
      >
        <div className="p-5">
          <h5 className="mb-2 text-1xl tracking-tight text-white">{name}</h5>
          {userData.admin === "1" && (
            <div className="flex justify-center pt-5">
              <DeleteButton deleteFunction={handleDelete} />
              <EditButtonModal link="/categories/update/" id={id} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
