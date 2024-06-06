import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { viewAuthors } from "../../../requests_api/authors";
import { viewCategories } from "../../../requests_api/categories";
import { findBooks, updateBook } from "../../../requests_api/books";

export default function EditBooks() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: "",
    image: "",
    author_id: "",
    category_id: "",
  });

  const handleChange = (e) => {
    if (
      e.target.id === "quantity" &&
      (isNaN(e.target.value) || parseInt(e.target.value) < 1)
    ) {
      notifyFailQuantity("Quantity need to be a valid number");
      setIsButtonDisabled(true);
      return;
    }

    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files;
    if (file) {
      setImageUrl(file);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await viewCategories();
        if (response) {
          setCategories(response);
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
        if (response) {
          setAuthors(response);
        } else {
          console.error("Error: Invalid data format received");
        }
      } catch (error) {
        console.error("Error searching for Authors:", error);
      }
    };

    fetchAuthors();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await findBooks(id);
        setFormData(response);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const formDataObject = new FormData();
      formDataObject.append("name", formData.name);
      formDataObject.append(
        "quantity",
        parseInt(formData.quantity)
      );
      formDataObject.append("description", formData.description);
      formDataObject.append("image", imageUrl[0]);
      formDataObject.append("author", parseInt(formData.author_id));
      formDataObject.append("category", parseInt(formData.category_id));

      const name = formDataObject.get('name');
      const quantity = formDataObject.get('quantity');
      const description = formDataObject.get('description');
      const image = formDataObject.get('image');
      const author_id = formDataObject.get('author');
      const category_id = formDataObject.get('category');

      console.log(category_id);
      console.log(author_id);


      await updateBook(id, name, quantity, description, image, author_id, category_id);
      notifySuccess();
    } catch (error) {
      notifyFail(error.message);
      console.error("Error calling API:", error.message);
    }
  };


  const notifySuccess = () => {
    toast.success("Success!", {
      position: "bottom-left",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      onClose: () => navigate(`/books/${id}`),
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
      onClose: () => window.location.reload(),
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
    <div
      className="flex items-center justify-center"
      style={{ height: "auto" }}
    >
      <div className="w-full max-w-lg p-4 bg-gray-800 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h5 className="text-xl font-medium text-white">Edit Book</h5>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-white"
            >
              Edit Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={formData.name}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="The hobbit"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-white"
            >
              Edit Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              onChange={handleChange}
              value={formData.description}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Description"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="quantity"
              className="block mb-2 text-sm font-medium text-white"
            >
              Edit Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              onChange={handleChange}
              value={formData.quantity}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Quantity"
              required
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
              htmlFor="author_id"
              className="block mb-2 text-sm font-medium text-white"
              value="Select the Author"
            />
            <div>
              <select
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                id="author_id"
                required
                onChange={handleChange}
                value={formData.author_id}
              >
                <option value="" disabled>
                  Author
                </option>
                <option value="" disabled>
                  Choose the author
                </option>
                {authors.map((authors) => (
                  <option key={authors.id} value={authors.id}>
                    {authors.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-span-2">
            <label
              htmlFor="category_id"
              className="block mb-2 text-sm font-medium text-white"
              value="Select the Author"
            />
            <div>
              <select
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                id="category_id"
                required
                onChange={handleChange}
                value={formData.category_id}
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

          <button
            type="submit"
            disabled={isButtonDisabled}
            className="w-full text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
