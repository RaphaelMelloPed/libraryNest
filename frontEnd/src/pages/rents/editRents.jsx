import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { findBooks } from "../../../requests_api/books";
import { useParams, useNavigate } from "react-router-dom";
import { updateRents, findRents } from "../../../requests_api/rents";

export default function EditRent() {
  const [renewed, setrenewed] = useState("");

  const [book, setBook] = useState({ name: "" });
  const [rent, setRent] = useState({ returns_date: "" });
  const [nextWeek, setNextWeek] = useState({new_date: ""})
  const [userData, setUserData] = useState("");
  const userDataFromStorage = localStorage.getItem("user");
  const parsedUserData = JSON.parse(userDataFromStorage);
  useEffect(() => {
    if (userDataFromStorage) {
      setUserData(parsedUserData.user);
    }
  }, []);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    const formattedDate = nextWeek.toISOString().slice(0, 10);
    setNextWeek({ new_date: formattedDate });
  }, []);

  useEffect(() => {
    const fetchRent = async () => {
      try {
        const response = await findRents(id);
        const rentData = response[0];
        setRent(rentData);
        setrenewed(rentData.returns_date);
        if (response.length > 0) {
          const bookResponse = await findBooks(rentData.book.id);
          setBook(bookResponse ?? {});
        }
      } catch (error) {
        console.error("Error fetching rent data:", error);
      }
    };
    fetchRent();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (rent.returns_date < renewed) {
        return notifyFail(
          "New return date cannot be earlier than the original return date"
        );
      }

      await updateRents(id, rent, renewed);
      notifySuccess();
    } catch (error) {
      notifyFail(error.response.data.message);
      console.error("Error updating rent:", error);
    }
  };

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
      onClose: () => navigate(`/rents/`)
      });
  };

  const notifyFail = (message) => {
    toast.error(message, {
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
    <div>
      {userData.admin == 1 ? (
        <div className="flex items-center justify-center pt-5">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg p-4 bg-gray-800 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8"
          >
            <h5 className="text-xl font-mediumtext-white text-center text-white">
              Edit rents
            </h5>
            <div className="mb-6">
              <label
                htmlFor="book_id"
                className="block mb-2 text-sm font-medium text-white"
              >
                Book's name
              </label>
              <input
                type="text"
                id="book_id"
                name="book_id"
                disabled
                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={book.name}
                onChange={(e) => setBook({ ...book, full_name: e.target.value })}
              />
            </div>

            <div className="mb-6 ">
              <label
                htmlFor="returns_date"
                className="block mb-2 text-sm font-medium text-white cursor-pointer"
              >
                return date
              </label>
              <input
                disabled
                type="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-text  "
                value={nextWeek.new_date.slice(0, 10)}
                onChange={(e) => setRent({ ...rent, returns_date: e.target.value })}
                id="pointer"
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Edit rent
            </button>
          </form>
        </div>
      ) : (
        <div
          className="pt-5 text-xl text-center flex justify-center flex-col"
          style={{ height: "65vh" }}
        >
          <h1 className="text-4xl">
            Only admins can access this page
          </h1>
        </div>
      )}
    </div>
  );
}
