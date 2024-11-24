import React, { useState, useEffect } from "react";
import axios from "axios";

function AddCafe() {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [region, setRegion] = useState();
  const [address, setAddress] = useState();
  const [postalCode, setPostalCode] = useState();
  const [regionMap, setRegionMap] = useState([]);
  const [image, setImageUrl] = useState();
  //   const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("http://localhost:3000/postalCode")
      .then((result) => setRegionMap(result.data.postalcode))
      .catch((error) => console.error("Error fetching data", error)); // Always good to handle errors
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullAddress = address + ", Singapore " + postalCode;
    console.log(fullAddress);
    const data = {
      name,
      description,
      address: fullAddress,
      region,
      //   image: image || "",
    };
    console.log(data);
    axios
      .post("http://localhost:3000/add-cafe", data)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  const onChangePostalCode = (e) => {
    e.preventDefault();
    setPostalCode(e.target.value);
    findRegionByPostalCode(postalCode);
  };

  const findRegionByPostalCode = (code) => {
    const sectorCode = code.slice(0, 2); // Extract the first two digits of the postal code (Postal Sector)
    console.log("regionmap", regionMap);
    const found = regionMap.find((entry) =>
      entry.postalSector.includes(sectorCode)
    );

    if (found) {
      console.log("found", found);
      setRegion(found.zone);
      return {
        zone: found.zone,
        district: found.district,
        location: found.location,
      };
    }

    return null; // If no match is found
  };

  // Example usage:
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 py-12">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-center text-3xl font-bold mb-6 text-gray-700">
          Add New Cafe
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Cafe Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="font-medium text-gray-600">
              Cafe Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter cafe name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Cafe Description */}
          <div className="flex flex-col">
            <label htmlFor="description" className="font-medium text-gray-600">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter cafe description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="region" className="font-medium text-gray-600">
              Address
            </label>
            <input
              type="text"
              id="region"
              placeholder="Enter cafe address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="region" className="font-medium text-gray-600">
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              placeholder="Enter cafe postal code "
              value={postalCode}
              onChange={onChangePostalCode}
              className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          {/* Cafe Region */}
          <div className="flex flex-col">
            <label htmlFor="region" className="font-medium text-gray-600">
              Region (Location)
            </label>
            <input
              type="text"
              id="region"
              placeholder="Enter cafe location (region)"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Add Cafe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCafe;
