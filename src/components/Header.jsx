import React from "react";
import { Link } from "react-router-dom";
import AuthMenu from "./AuthMenu";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-blue-500 p-6 text-white shadow-lg text-center flex justify-between items-center">
      <Link to="/" className="  text-3xl font-bold text-center">
        My Todo App
      </Link>
      <div>
        <AuthMenu user={user} />
      </div>
    </div>
  );
};

export default Header;
