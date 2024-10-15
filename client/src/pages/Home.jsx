import React from "react";
import { useEffect, useState } from "react";
import CafeCard from "../components/CafeCard";
import { useDispatch, useSelector } from "react-redux";
import { setCafes } from "../redux/cafeSlice";
const Home = () => {
  //   const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  const cafes = useSelector((state) => state.cafes.cafes);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000");
      const data = await res.json();
      console.log("items", data);
      dispatch(setCafes(data.items));
      //   setItems(data.items);
    };
    fetchData();
  }, [dispatch]);
  return (
    <div>
      <div className="container mx-auto py-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Top Cafes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {/* {cafes.map((i) => (
            <CafeCard item={i} key={i.id} />
          ))} */}
          {Array.isArray(cafes) && cafes.length > 0 ? (
            cafes.map((cafe) => <CafeCard item={cafe} key={cafe.id} />)
          ) : (
            <p>No cafes found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
