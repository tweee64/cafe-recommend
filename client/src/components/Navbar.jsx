import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { setSearchTerm } from "../redux/cafeSlice";
const Navbar = () => {
  const [search, setSearch] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(search));
    navigate("/filter-data");
  };
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-16 lg:px-24 py-4 flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link to="/">Cafe Rec</Link>
        </div>
        <div className="relative flex-1 mx-4">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="search restaurant"
              className="w-full border py-2 px-4"
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className="absolute top-3 right-3 text-red-500"></FaSearch>
          </form>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/cart">
            <FaShoppingCart className="text-lg" />
          </Link>
          <button className="hidden md:block">Login | Register</button>
          <button className="block md:hidden">
            <FaUser />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center space-x-10 py-4 text-sm font-bold">
        <Link className="hover:underline">Home</Link>
        <Link className="hover:underline">Shop</Link>
        <Link className="hover:underline">Contact</Link>
        <Link className="hover:underline">About</Link>
      </div>
    </nav>
  );
};

export default Navbar;
