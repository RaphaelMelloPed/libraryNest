import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { allUsers, findUser } from "../../../../requests_api/users";
import DeleteButton from "../../../components/Buttons/DeleteButton";
import { allReviews, deleteReviews } from "../../../../requests_api/reviews";

export default function Review({ comment, rating, id, book_id, user_id }) {
  const adminData = localStorage.getItem("user");
  const adminObject = JSON.parse(adminData);
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([])


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await allUsers(user_id);
        const filteredUsers = response.viewUsers.filter(
          (user) => user.id == user_id
        );
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error finding user:", error);
      }
    };

    fetchUsers();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteReviews(id, book_id);
      notifySuccess()
    } catch (error) {
      notifyFail(error.message)
      console.error("Error calling API:", error.message);
    }
  };

  const isCommentAuthor = users.some((user) => user.id === adminObject.id);

  const Stars = ({ rating }) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= rating;

      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 ${
            isFilled ? "text-yellow-300" : "text-gray-300"
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      );
    }

    return <div className="flex">{stars}</div>;
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
      onClose: () => window.location.reload()
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
      <article className="bg-white border border-gray-200 rounded-lg shadow w-full">
        <div className="flex justify-between m-3">
          <div className="flex items-center mb-4 ">
            {users.map((user) => (
              <React.Fragment key={user.id}>
                <img
                  className="w-10 h-10 me-4 rounded-full"
                  src={user.image}
                  alt=""
                />
                <div className="font-medium dark:text-white">
                  <p className="text-black">
                    {user.name}
                    <time
                      dateTime="2014-08-16 19:00"
                      className="block text-sm text-gray-500 dark:text-gray-400"
                    >
                    </time>
                  </p>
                </div>
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse ">
            <Stars rating={rating} className="" />
          </div>
        </div>


        <p className="mb-2 dark:text-gray-400 text-sm m-3 text-black break-all">
          {comment}
        </p>
        <div className="flex justify-end">
          {(adminObject.admin == "1" || isCommentAuthor) && (
            <DeleteButton deleteFunction={handleDelete} />
          )}
        </div>
      </article>
    </>
  );
}
