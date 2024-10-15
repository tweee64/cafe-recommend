import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const CafeCard = ({ item }) => {
  return (
    <Link to={`/item/${item._id}`}>
      <div className="bg-white p-4 shadow rounded relative border transform transition-transform duration-300 hover:scale-105">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-containmb-4"
        />
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-gray-500">{item.description}</p>
        <div className="flex items-center mt-2">
          <FaStar className="text-yellow-500"></FaStar>
          <FaStar className="text-yellow-500"></FaStar>
          <FaStar className="text-yellow-500"></FaStar>
          <FaStar className="text-yellow-500"></FaStar>
        </div>
      </div>
    </Link>
  );
};

export default CafeCard;
