import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { findCategories, updateCategories } from "../.././../requests_api/categories";

export default function EditCategory() {
  const { id } = useParams();
  const [formData, setFormData] = useState({ name: ""});
  const [nameCategory, setNameCategory] = useState({ name: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await findCategories(id);
        setFormData(response)
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchCategories();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCategories(id, formData.name);
      notifySuccess();
    } catch (error) {
      console.error("Error calling API:", error.message);
      notifyFail();
    }
  };

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
      onClose: () => navigate("/categories")
      });
  };

  const notifyFail = () => {
    toast.error('Something went wrong!', {
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
    <div className="flex items-center justify-center" style={{ height: "60vh" }}>
      <div className="w-full max-w-lg p-4 bg-gray-800 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h5 className="text-xl font-medium text-white">Edit Category</h5>
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">Edit Name</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} value={formData.name}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Socrates"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
