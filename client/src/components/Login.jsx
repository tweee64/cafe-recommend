import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Login({ openSignUp, setIsModalOpen }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiUrl = `${import.meta.env.VITE_API_URL}`;

    axios
      .post(`${apiUrl}login`, { email, password })
      .then((result) => {
        console.log(result);
        if (result.data.message === "Success") {
          console.log("success");
          console.log("user", result.data.user);
          localStorage.setItem("user", JSON.stringify(result.data.user)); // Store user in localStorage
          window.location.reload(); // Reload the page
          setIsModalOpen(false);
        } else {
          setError(result.data);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="">
            Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="">
            Password
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 border"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="text-red-800">{error}</span>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox" />
            <span className="ml-2 text-gray-700">Remember Me</span>{" "}
          </label>
          <a href="#" className="text-red-800">
            Forgot Password
          </a>
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="w-full text-white py-2 px-4 rounded-lg bg-color-button hover:bg-red-500"
          >
            {" "}
            Login
          </button>
        </div>
      </form>
      <div className="text-center">
        <span className="text-gray-700">Don't Have an Account? </span>
        <button className="text-red-800" onClick={openSignUp}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Login;
