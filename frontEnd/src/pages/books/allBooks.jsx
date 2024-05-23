import { Pagination } from "flowbite-react";
import React, { useState, useEffect } from "react";
import NewBookModal from "./components/NewBookModal";
import { viewBooks } from "../../../requests_api/books";
import ViewBooksComponents from "./components/ViewBooksComponent";

export default function AllBooks() {
  const [books, setBooks] = useState([]);
  const onPageChange = (page) => setCurrentPage(page);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await viewBooks();
        if (
          response
        ) {
          const booksArray = response;
          setBooks(response);
          setTotalPages(Math.ceil(booksArray.length / 12));
        } else {
          console.error("Error: Invalid data format received");
        }
      } catch (error) {
        console.error("Error searching for books:", error);
      }
    };

    fetchBooks();
  }, []);

  const [userData, setUserData] = useState("");
  const userDataFromStorage = localStorage.getItem("user");
  const parsedUserData = JSON.parse(userDataFromStorage);
  useEffect(() => {
    if (userDataFromStorage) {
      setUserData(parsedUserData.user);
    }
  }, []);

  const indexOfLastBook = currentPage * 12;
  const indexOfFirstBook = indexOfLastBook - 12;
  const currentBook = books.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <>
      {userData.admin == "1" && (
        <div className="flex justify-center p-5">
          <NewBookModal />
        </div>
      )}

      {books.length === 0 && (
        <div
          className="pt-5 text-xl text-center flex justify-center flex-col"
          style={{ height: "60vh" }}
        >
          <h1 className="text-4xl">We don't have any books yet</h1>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center p-5">
        {currentBook.map((book) => (
          <ViewBooksComponents
            key={book.id}
            id={book.id}
            full_name={book.name}
            quantity={book.quantity}
            image={book.image}
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
