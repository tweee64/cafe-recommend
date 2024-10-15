import React from "react";
import { useSelector } from "react-redux";
import CafeCard from "../components/CafeCard";
const FilterData = () => {
  const filterCafes = useSelector((state) => state.cafes.filteredData);
  return (
    <div className="container mx-auto py-12">
      {filterCafes.length > 0 ? (
        <>
          {" "}
          <h2 className="text-2xl font-bold mb-6 text-center">Top Cafes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols4 lg:grid-cols-5 gap-6">
            {filterCafes.map((i) => (
              <CafeCard item={i} key={i.id} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center"> No cafe found</div>
      )}
    </div>
  );
};

export default FilterData;
