import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const URL = import.meta.env.VITE_BASE_URL;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${URL}/auth/login/`, {
        username: formData.username,
        password: formData.password,
      });

      toast.success("Login successful!");
      const { access, refresh } = response.data;
      const user = { username: formData.username };
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      const EXPIRATION_TIME = Date.now() + 60 * 60 * 1000;
      localStorage.setItem("token_expiry", EXPIRATION_TIME);

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.detail ||
          error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen py-20 flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Sign In
        </h2>
        <form
          onSubmit={handleSubmit}
          className="rounded-lg shadow-md w-full max-w-md"
        >
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-3 mb-4 border rounded"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 mb-4 border rounded"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded"
          >
            Sign In
          </button>
        </form>
        <div className="py-2 text-center px-2">
          Don’t have an account?
          <Link className="text-blue-500 cursor-pointer px-1" to={"/signup"}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
