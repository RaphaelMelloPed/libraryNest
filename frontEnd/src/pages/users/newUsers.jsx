import { toast } from "react-toastify";
import React, { useState } from "react";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { newUsers } from "../../../requests_api/users";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Register = () => {
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUrl(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!containsNumber(formData.password) || formData.password.length < 8) {
      notifyFail("Something is missing from the password.");
      return;
    }

    try {
      setIsSubmitting(true);
      const formDataObject = new FormData();
      formDataObject.append("email", formData.email);
      formDataObject.append("name", formData.name);
      if (formData.password !== formData.passwordConfirm) {
        return notifyFail("Password is not the same");
      }
      formDataObject.append("password", formData.password);

      if (imageUrl) {
        formDataObject.append("image", imageUrl);
      } else {
        formDataObject.append("image", "");
      }

      await newUsers(formDataObject);

      notifySuccess();
    } catch (error) {
      notifyFail(error.message);
      console.error("Error calling API:", error.message);
      console.error("Server response:", error.response.data);
    }
  };

  const notifySuccess = () => {
    toast.success("User created!", {
      position: "bottom-left",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      onClose: () => navigate("/"),
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

  const containsNumber = (password) => {
    const numbers = password.match(/\d/g);
    return numbers ? numbers.length : 0;
  };

  return (
    <>
      <div className="flex items-center justify-center h-4/5 p-5">
        <div className="w-full max-w-lg p-4 bg-gray-800 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h5 className="text-xl font-medium text-white dark:text-white text-center">
              Register
            </h5>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white dark:text-white"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="johnfalcon@email.com"
                required
                onChange={handleChange}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-white dark:text-white"
              >
                Your name
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John Falcon"
                required
                onChange={handleChange}
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
                  value={formData.password}
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  Password must contain 8 character
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

            <button
              type="submit"
              className="w-full text-white bg-green-600  hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
