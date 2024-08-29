import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useUser();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

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

    axios
      .post("http://localhost:3001/api/login", formData)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("jwtToken", token);
        setUser(formData.username);
        navigate("/");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data.error);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        alert("Incorrect Username or Password");
        navigate("/login");
      });
  };

  useEffect(() => {
    localStorage.removeItem("jwtToken");
  }, []);

  return (
    <div className="flex h-[91vh] bg-white dark:bg-gray-900">
      <div className="flex-1 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
        <form
          className="w-[90%] max-w-md p-[100px] border-2 rounded-lg border-gray-300 dark:border-gray-700"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-5 text-lightText dark:text-white">
            Login
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
          <button className="w-full p-2 rounded transition bg-lightDBg text-white hover:bg-blue-400 dark:bg-gray-900 dark:hover:bg-blue-500">
            Login
          </button>
          <Link to="/register">
            <p className="dark:text-white text-lightText pt-2">
              No account{" "}
              <span className="underline underline-offest-2">Click Here</span>
              {" "}to register
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
