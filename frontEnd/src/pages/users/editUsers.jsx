import { toast } from "react-toastify";
import IconButton from "@mui/material/IconButton";
import React, { useState, useEffect } from "react";
import Visibility from "@mui/icons-material/Visibility";
import { useParams, useNavigate } from "react-router-dom";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { findUser, updateUsers } from "../../../requests_api/users";

export default function EditUser() {
  const { id } = useParams();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageUrl, setImageUrl] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    passwordConfirm: ""
  });

  const navigate = useNavigate();

  const handleFileChange = async (e) => {
    const file = e.target.files;
    if (file) {
      setImageUrl(file);
    } else {
      return;
    }
  };

  const formChange = (e) => {
    if (e.target.id === "passwordConfirm") {
      setPasswordConfirm(e.target.value);
    } else {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value.trim(),
      });
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const containsNumber = (password) => {
    const numbers = password.match(/\d/g);
    return numbers ? numbers.length : 0;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await findUser(id);
        setFormData(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [id]);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!containsNumber(formData.password) || formData.password.length < 8) {
      notifyFail("Something is missing from the password.");
      return;
    }

    try {
      setIsSubmitting(true);
      const formDataObject = new FormData();
      formDataObject.append("name", formData.name);
      formDataObject.append("image", imageUrl[0]);
      formDataObject.append("password", formData.password);

      if (formData.password !== passwordConfirm) {
        return notifyFail("Password is not the same");
      }

      await updateUsers(id, formDataObject);

      logout();
      navigate("/")
      window.location.reload()
      notifySuccess();
    } catch (error) {
      notifyFail();
      console.error("Error calling API:", error.message);
      console.error("Server response:", error.response.data);
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
      onClose: () => navigate("/")
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
    <div
      className="flex items-center justify-center"
      style={{ height: "auto" }}
    >
      <div className="w-full max-w-lg p-4 bg-gray-800 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h5 className="text-xl font-medium text-white">Edit User</h5>
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
              onChange={formChange}
              value={formData.name}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="The hobbit"
              required
            />
          </div>
          <div className="">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                onChange={formChange}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                tabIndex={-1}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </div>
          </div>

          <div className="">
            <label
              htmlFor="passwordConfirm"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Type your password again
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="passwordConfirm"
                onChange={formChange}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                tabIndex={-1}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </div>
          </div>

          <div className="text-sm	bg-gray-200 rounded-lg drop-shadow-lg">
            <h1 className="text-black text-center text-lg">
              Password validation:
            </h1>
            {formData.password.length < 8 ? (
              <p className="text-red-500 p-2">
                Password must contain 8 character
              </p>
            ) : (
              <p className="text-green-500 p-2">
                Password must contain 5 character
              </p>
            )}
            {containsNumber(formData.password) < 2 ? (
              <p className="text-red-500 p-2">
                Password must contain at least 2 numbers
              </p>
            ) : (
              <p className="text-green-500 p-2">
                Password contains at least 2 numbers
              </p>
            )}
          </div>

          <div className="">
            <label
              className="block mb-2 text-sm font-medium text-white dark:text-white"
              htmlFor="file_input"
            >
              Upload your profile picture
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
