import { toast } from "react-toastify";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import React, { useState, useEffect } from "react";

import { viewAuthors } from "../../../../requests_api/authors";
import { newBook } from "../../../../requests_api/books";
import { viewCategories } from "../../../../requests_api/categories";

export default function modal() {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    full_name: "",
    description: "",
    quantity: "",
    image: "",
    id_authors: "",
    id_categories: "",
  });

  const handleChange = (e) => {
    if (e.target.id === "quantity" && (isNaN(e.target.value) || parseInt(e.target.value) < 1)) {
      notifyFailQuantity("Quantity need to be a valid number")
      setIsButtonDisabled(true);
      return;
    }

    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
    setIsButtonDisabled(false);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUrl(file);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await viewCategories();
        if (
          response &&
          response.viewCategories &&
          Array.isArray(response.viewCategories)
        ) {
          setCategories(response.viewCategories);
        } else {
          console.error("Error: Invalid data format received");
        }
      } catch (error) {
        console.error("Error searching for categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await viewAuthors();
        if (
          response &&
          response.viewAuthors &&
          Array.isArray(response.viewAuthors)
        ) {
          setAuthors(response.viewAuthors);
        } else {
          console.error("Error: Invalid data format received");
        }
      } catch (error) {
        console.error("Error searching for Authors:", error);
      }
    };

    fetchAuthors();
  }, []);

  const handleCloseModalAndNavigate = () => {
    onCloseModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        setIsSubmitting(true);
        const formDataObject = new FormData();
        formDataObject.append('full_name', formData.full_name);
        formDataObject.append('quantity', formData.quantity);
        formDataObject.append('description', formData.description);
        formDataObject.append('image', imageUrl);
        formDataObject.append('id_authors', formData.id_authors);
        formDataObject.append('id_categories', formData.id_categories);

        await newBook(formDataObject);

        notifySuccess()
    } catch (error) {
        notifyFail(error.message)
        console.error('Error calling API:', error.message);
    }
};

  const notifySuccess = () => {
    toast.success('Successifully created the book!', {
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

  const notifyFailQuantity = (message) => {
    toast.error(message, {
      position: "bottom-left",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  };

  return (
    <div>
      <button
        onClick={onOpenModal}
        data-modal-target="crud-modal"
        data-modal-toggle="crud-modal"
        className="block text-white bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Create new book
      </button>
      <Modal open={open} onClose={onCloseModal} center className="bg-gray-700">
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 bg-gray-700">
              <h3 className="text-lg font-semibold text-white">
                Create New Book
              </h3>
            </div>

            <form
              className="p-4 md:p-5 bg-gray-700"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="full_name"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="The hobbit"
                    required=""
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    onChange={handleChange}
                    rows="4"
                    className="block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write book description here"
                  ></textarea>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="quantity"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="15"
                    required=""
                  />
                </div>
                <div className="col-span-2">
                  <label
                    className="block mb-2 text-sm font-medium text-white dark:text-white"
                    htmlFor="file_input"
                    
                  >
                    Upload the book's image
                  </label>
                  <input
                    className="block w-full text-sm text-black border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input"
                    type="file"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="id_authors"
                    className="block mb-2 text-sm font-medium text-white"
                    value="Select the Author"
                  />
                  <div>
                    <select
                      className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      id="id_authors"
                      required
                      onChange={handleChange}
                      value={formData.id_authors}
                    >
                      <option value="" disabled>
                        Author
                      </option>
                      {authors.map((author) => (
                        <option key={author.id} value={author.id}>
                          {author.full_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="id_categories"
                    className="block mb-2 text-sm font-medium text-white"
                    value="Select the Author"
                  />
                  <div>
                    <select
                      className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      id="id_categories"
                      required
                      onChange={handleChange}
                      value={formData.id_categories}
                    >
                      <option value="" disabled>
                        Category
                      </option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <button
                onClick={handleCloseModalAndNavigate}
                disabled={isButtonDisabled}
                type="submit"
                className="text-white inline-flex items-center bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Create Book
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}
