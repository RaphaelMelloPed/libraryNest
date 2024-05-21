import { toast } from "react-toastify";
import NewReview from "./components/NewReview";
import React, { useState, useEffect } from "react";
import { newRents } from "../../../requests_api/rents";
import { findBooks } from "../../../requests_api/books";
import { deleteBooks } from "../../../requests_api/books";
import { useParams, useNavigate } from "react-router-dom";
import RentBook from "../../components/Buttons/RentButton";
import DeleteButton from "../../components/Buttons/DeleteButton";
import EditButtonModal from "../../components/Buttons/EditButton";

export default function OneBook() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const navigate = useNavigate();
  const [rent, setRent] = useState({
    id_books: "",
    id_user: ""
  });
  

  const handleDelete = async () => {
    try {
      await deleteBooks(id);
      navigate(`/books`);
      notifySuccess()
    } catch (error) {
      notifyFail(error.message)
      console.error("Error deleting Book:", error.message);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await findBooks(id);
        setBook(response);
        setRent((prevRent) => ({
          ...prevRent,
          id_books: id
        }))
      } catch (error) {
        console.error("Error searching for book:", error);
      }
    };

    fetchBooks();
  }, [id]);

  const [userData, setUserData] = useState("");

  useEffect(() => {
    const userDataFromStorage = localStorage.getItem("user");
    if (userDataFromStorage) {
      const parsedUserData = JSON.parse(userDataFromStorage);
      setUserData(parsedUserData);
      setRent((prevRent) => ({
        ...prevRent,
        id_user: parsedUserData.id
      }));
    }
  }, []);

  const handleRent = async () => {
    try {
      const rentData = {
      ...rent,
        id_books: parseInt(rent.book_id),
        id_user: parseInt(rent.user_id),
      };
  
      await newRents(rentData);
      notifySuccess()
    } catch (error) {
      notifyFail('Something went wrong!')
      console.error("Error renting Book:", error.message);
    }
  };

  const notifySuccess = () => {
    toast.success('Success!', {
      position: "bottom-left",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      onClose: () => navigate(`/books`)
      });
  };

  const notifyFail = (message) => {
    toast.error(message, {
      position: "bottom-left",
      autoClose: 1500,
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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex justify-center p-5">
          <div className="max-w-sm bg-gray-800 rounded-lg shadow p-5">
            <div className="flex justify-center">
              <img
                className="rounded-t-lg"
                src={book.image}
                alt={book.name}
              />
            </div>
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                {book.name}
              </h5>
              <h5 className="text-white">Description:</h5>
              <p className="mb-3 font-normal text-white">{book.description}</p>
            </div>
            <div className="flex justify-center">
              {userData && book.quantity > 0 && (
                <div >
                  <RentBook rentFunction={handleRent} />
                </div>
              )}
              </div>
              <div>
              {userData.admin == "1" && (
                <div className="flex justify-center pt-3">
                  <EditButtonModal link="/books/update/" id={id} />
                  <DeleteButton deleteFunction={handleDelete} />
                </div>
              )}
            </div>
          </div>
        </div>
        <NewReview />
      </div>
    </>
  );
}
