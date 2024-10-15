import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const CafeDetail = () => {
  const { id } = useParams();
  const cafes = useSelector((state) => state.cafes.cafes);
  const [cafe, setCafe] = useState(null); // Initial state as null

  useEffect(() => {
    const newCafe = cafes.find((cafe) => cafe._id === id);
    setCafe(newCafe);
    console.log("cafe", newCafe);
  }, [id, cafes]);

  // Handle case where cafe is not found
  if (!cafe) {
    return <div>Loading..</div>; // Or you can show a loading state
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-16 lg:px-24">
      <div className="flex flex-col md:flex-row gap-x-16">
        <div className="md:w-1/2 py-4 shadow-md md:px-8 h-96 flex justify-center">
          <img src={cafe.image} alt={cafe.image} className="h-full" />
        </div>
        <div className="md:w-1/2 p-4 shadow-md md:p-16 flex flex-col items-center gap-y-2">
          {" "}
          <h2 className="text-3xl font-semibold mb-2">{cafe.name}</h2>
          <p className="text-xl font-semibold text-gray-800 mb-4">
            {cafe.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CafeDetail;
