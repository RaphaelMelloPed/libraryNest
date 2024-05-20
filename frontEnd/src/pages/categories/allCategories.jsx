import { Pagination } from "flowbite-react";
import React, { useState, useEffect } from "react";
import NewCategoryModal from "./components/NewCategoryModal";
import { viewCategories } from "../../../requests_api/categories";
import ViewCategoryComponent from "./components/ViewCategoryComponent";

export default function AllCategories() {
  const [categories, setCategories] = useState([]);
  const onPageChange = (page) => setCurrentPage(page);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await viewCategories();
        if (
          response
        ) {
          const categoriesArray = response;
          setCategories(response);
          setTotalPages(Math.ceil(categoriesArray.length / 12));
        } else {
          console.error("Error: Invalid data format received");
        }
      } catch (error) {
        console.error("Error searching for categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const [userData, setUserData] = useState("");

  useEffect(() => {
    const userDataFromStorage = localStorage.getItem("user");
    if (userDataFromStorage) {
      const parsedUserData = JSON.parse(userDataFromStorage);
      setUserData(parsedUserData);
    }
  }, []);

  const indexOfLastcategory = currentPage * 12;
  const indexOfFirstcategory = indexOfLastcategory - 12;
  const currentCategory = categories.slice(
    indexOfFirstcategory,
    indexOfLastcategory
  );

  return (
    <>
      {userData.admin === "1" && (
        <div className="flex justify-center pt-5">
          <NewCategoryModal />
        </div>
      )}

      {categories.length === 0 && (
        <div
          className="pt-5 text-xl text-center flex justify-center flex-col"
          style={{ height: "60vh" }}
        >
          <h1 className="text-4xl">We don't have any categories yet</h1>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5 place-items-center">
        {currentCategory.map((category) => (
          <ViewCategoryComponent
            key={category.id}
            id={category.id}
            name={category.name}
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
