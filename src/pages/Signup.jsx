import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const URL = import.meta.env.VITE_BASE_URL;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(`${URL}/auth/register/`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      toast.success("Sign up successful!");
      console.log(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen py-20 flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Sign Up
        </h2>
        <form
          onSubmit={handleSubmit}
          className=" rounded-lg shadow-md w-full max-w-md"
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
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border rounded"
            value={formData.email}
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

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-3 mb-4 border rounded"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded"
          >
            Sign Up
          </button>
        </form>
        <div className="py-2 text-center px-2">
          Already have an account?
          <Link className="text-blue-500 cursor-pointer px-1" to={"/signin"}>
            Signin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
