import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { setSearchTerm } from "../redux/cafeSlice";
import { setCafes } from "../redux/cafeSlice";
import { useSelector } from "react-redux";
import Register from "./Register";
import Login from "./Login";
import Modal from "./Modal";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setisLogin] = useState(true);
  const openSignUp = () => {
    setisLogin(false);
    setIsModalOpen(true);
  };

  const openLogin = () => {
    setisLogin(true);
    setIsModalOpen(true);
  };
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1); // Track selected index

  const handleInputChange = (e) => {
    const value = e.target.value;
    console.log("value", value);
    setSearch(value);
    setDropdownOpen(value.length > 0);
    setSelectedIndex(-1);
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    if (selectedIndex !== -1) {
      // If a suggestion is selected, perform the action
      const selectedCafe = flattenedList[selectedIndex];
      setSearch(selectedCafe.name); // Set the input field to the selected suggestion
      dispatch(setSearchTerm(selectedCafe.name)); // Update the Redux store with the selected cafe name
      setSelectedIndex(-1); // Reset selected index
      navigate("/filter-data");
      setDropdownOpen(false);
    } else if (search) {
      // If there is no selected item but there is text in the input, search by the text
      dispatch(setSearchTerm(search)); // Dispatch the search term to Redux
      navigate("/filter-data");
      setDropdownOpen(false);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && selectedIndex !== -1) {
      // If Enter is pressed, select the highlighted suggestion
      const selectedItem = flattenedList[selectedIndex];

      setSearch(selectedItem.name);
      dispatch(setSearchTerm(selectedItem.name));
      setDropdownOpen(false);
      setSelectedIndex(-1);
      navigate("/filter-data");
      setSearch("");
    }

    if (e.key === "ArrowDown") {
      // Move selection down
      console.log("arrow down");
      if (selectedIndex < flattenedList.length - 1) {
        setSelectedIndex((prevIndex) => prevIndex + 1);
      }
    }

    if (e.key === "ArrowUp") {
      // Move selection up
      console.log("arrow up");

      if (selectedIndex > 0) {
        setSelectedIndex((prevIndex) => prevIndex - 1);
      }
    }
  };
  const onSearch = (searchTerm) => {
    setSearch(searchTerm);
    dispatch(setSearchTerm(searchTerm));
    setDropdownOpen(false);
    setSelectedIndex(-1);
    navigate("/filter-data");
    setSearch("");

    console.log("search", searchTerm);
  };
  const cafes = useSelector((state) => state.cafes.cafes);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000");
      const data = await res.json();
      console.log("items", data);
      dispatch(setCafes(data.items));
    };
    fetchData();
  }, [dispatch]);

  let filteredCafes = search
    ? cafes.filter(
        (item) =>
          item?.name.toLowerCase().includes(search.toLowerCase()) ||
          item.region.toLowerCase().includes(search.toLowerCase()) // Also match location
      )
    : cafes; // Show all cafes if there's no search term

  const groupedCafes = filteredCafes.reduce((groups, cafe) => {
    const locationGroup = cafe.region || "Other Locations"; // Default to "Other Locations" if no location
    if (!groups[locationGroup]) {
      groups[locationGroup] = [];
    }
    groups[locationGroup].push(cafe);
    return groups;
  }, {});
  const flattenedList = [];
  Object.keys(groupedCafes).forEach((location) => {
    flattenedList.push({ type: "location", name: location }); // Add location as a type "location"
    groupedCafes[location].forEach((cafe) => {
      flattenedList.push({
        type: "cafe",
        name: cafe.name,
        region: cafe.region,
        _id: cafe._id,
      }); // Add each cafe
    });
  });

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-16 lg:px-24 py-4 flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link to="/">Cafe Rec</Link>
        </div>
        <div className="relative flex-1 mx-4">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search cafe based on region"
              className="w-full border py-2 px-4"
              value={search}
              onFocus={() => setDropdownOpen(true)}
              onBlur={() => setTimeout(() => setDropdownOpen(false), 200)} // Close dropdown after input loses focus
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onEn
            />
            <FaSearch className="absolute top-3 right-3 text-red-500"></FaSearch>
            {isDropdownOpen && flattenedList.length > 0 && (
              <ul className="absolute z-10 w-full border border-gray-300 rounded-md shadow-lg mt-1 bg-white max-h-60 overflow-auto">
                {/* Loop through the flattened list (locations and cafes) */}
                {flattenedList.map((item, index) => (
                  <li
                    key={item._id || item.name}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-200 ${
                      index === selectedIndex ? "bg-gray-300" : ""
                    }`}
                    onClick={() => onSearch(item.name)} // Select suggestion
                  >
                    {item.type === "location" ? (
                      <div className="font-bold">{item.name}</div>
                    ) : (
                      <div>
                        {item.name}
                        <div className="text-sm text-gray-500">
                          {item.region}
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </form>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/cart">
            <FaShoppingCart className="text-lg" />
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="hidden md:block"
          >
            Login | Register
          </button>
          <button className="block md:hidden">
            <FaUser />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center space-x-10 py-4 text-sm font-bold">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="add-cafe" className="hover:underline">
          Add Cafe
        </Link>
        <Link className="hover:underline">Contact</Link>
        <Link className="hover:underline">About</Link>
      </div>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        {isLogin ? (
          <Login openSignUp={openSignUp} setIsModalOpen={setIsModalOpen} />
        ) : (
          <Register openLogin={openLogin} />
        )}
      </Modal>
    </nav>
  );
};

export default Navbar;
