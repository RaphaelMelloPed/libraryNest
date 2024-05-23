import { Pagination } from "flowbite-react";
import React, { useState, useEffect } from "react";
import NewAuthorModal from "./components/NewAuthorModal";
import { viewAuthors } from "../../../requests_api/authors";
import ViewAuthorsComponent from "./components/ViewAuthorsComponent";

export default function AllAuthors() {
  const [authors, setAuthors] = useState([]);
  const onPageChange = (page) => setCurrentPage(page);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await viewAuthors();
        if (
          response 
        ) {
          const authorsArray = response;
          setAuthors(response);
          setTotalPages(Math.ceil(authorsArray.length / 12));
        } else {
          console.error("Error: Invalid data format received");
        }
      } catch (error) {
        console.error("Error searching for Authors:", error);
      }
    };

    fetchAuthors();
  }, []);

  const [userData, setUserData] = useState("");
  const userDataFromStorage = localStorage.getItem("user");
  const parsedUserData = JSON.parse(userDataFromStorage);
  useEffect(() => {
    if (userDataFromStorage) {
      setUserData(parsedUserData.user);
    }
  }, []);

  const indexOfLastAuthor = currentPage * 12;
  const indexOfFirstAuthor = indexOfLastAuthor - 12;
  const currentAuthor = authors.slice(indexOfFirstAuthor, indexOfLastAuthor);

  return (
    <>
      {userData.admin == "1" && (
        <div className="flex justify-center pt-5">
          <NewAuthorModal />
        </div>
      )}

      {authors.length === 0 && (
        <div
          className="pt-5 text-xl text-center flex justify-center flex-col"
          style={{ height: "60vh" }}
        >
          <h1 className="text-4xl">We don't have any authors yet</h1>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5 place-items-center">
        {currentAuthor.map((author) => (
          <ViewAuthorsComponent
            key={author.id}
            id={author.id}
            name={author.name}
          />
        ))}
      </div>

      {totalPages !== 0 && totalPages !== 1 && (
        <div className="flex justify-center mt-4">
          <Pagination
            layout="pagination"
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            previousLabel="Back"
            nextLabel="Next"
            showIcons
          />
        </div>
      )}
    </>
  );
}
