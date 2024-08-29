import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    favorites: [],
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    axios
      .post("https://movieden.onrender.com/api/register", formData)
      .then((response) => {
        alert("Registration successful!");
        navigate("/login");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data.error);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        alert("Registration failed. Please try again.");
      });
  };

  useEffect(() => {
    localStorage.removeItem("jwtToken");
  }, []);

  return (
    <div className="flex h-[91vh] bg-white dark:bg-gray-900">
      <div className="flex-1 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
        <form
          className="w-[90%] max-w-md p-[60px] border-2 rounded-lg border-gray-300 dark:border-gray-700"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-5 text-lightText dark:text-white">
            Register
          </h2>
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block mb-1 font-semibold text-lightText dark:text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-black dark:text-white"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-1 font-semibold text-lightText dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-black dark:text-white"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-1 font-semibold text-lightText dark:text-gray-300"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-black dark:text-white"
              />
              <i
                className={`absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer ${
                  showPassword ? "fa fa-eye-slash" : "fa fa-eye"
                } dark:text-gray-400`}
                onClick={handleShowPassword}
              ></i>
            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="confirmPassword"
              className="block mb-1 font-semibold text-lightText dark:text-gray-300"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className={`w-full p-2 border rounded border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-black dark:text-white ${
                  !passwordsMatch ? "border-red-500" : ""
                }`}
              />
              <i
                className={`absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer ${
                  showPassword ? "fa fa-eye-slash" : "fa fa-eye"
                } dark:text-gray-400`}
                onClick={handleShowPassword}
              ></i>
            </div>
            {!passwordsMatch && (
              <p className="text-red-500 text-sm mt-1">
                Passwords do not match
              </p>
            )}
          </div>
          <button className="w-full p-2 rounded transition bg-lightDBg text-white hover:bg-blue-400 dark:bg-gray-900 dark:hover:bg-blue-500">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
