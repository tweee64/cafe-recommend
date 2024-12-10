import React, { useState } from "react";
import axios from "axios";

function AddReview({ cafeId, cafeName, onReviewAdded, user }) {
  //   const [cafeId, setCafeId] = useState();
  // const [reviewerName, setReviewerName]  = useState();
  const [review, setReview] = useState();
  const [rating, setRating] = useState();
  const [hover, setHover] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState("");
  const options = [
    { value: "ambience", label: "Ambience" },
    { value: "food", label: "Good Food" },
    { value: "drinks", label: "Good drinks" },
    { value: "toilet", label: "Clean toilet" },
  ];

  const handleCheckboxChange = (optionValue) => {
    setSelectedOptions(
      (prevSelected) =>
        prevSelected.includes(optionValue)
          ? prevSelected.filter((value) => value !== optionValue) // Remove if already selected
          : [...prevSelected, optionValue] // Add if not selected
    );
    console.log("selected", selectedOptions);
  };
  const handleRatingClick = (star) => {
    if (rating >= star) {
      setRating(star - 1);
    } else {
      setRating(star);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating) {
      setError("This field is required.");
      return;
    }

    // Clear error and proceed with form submission
    setError("");

    const data = {
      cafeId,
      reviewerName: user.username,
      review,
      rating,
      selectedOptions,
    };
    console.log(data);
    axios
      .post("http://localhost:3000/add-review", data)
      .then((result) => {
        console.log(result);
        if (result.status === 201) {
          onReviewAdded();
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-center text-3xl font-bold mb-6 text-gray-700">
          Add Review for {cafeName}
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Cafe Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="font-medium text-gray-600">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter cafe name"
              value={user.username}
              // onChange={(e) => setReviewerName(user.username)}
              className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="review" className="font-medium text-gray-600">
              Review
            </label>
            <textarea
              id="review"
              placeholder="Enter cafe review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows="4"
              className="mt-2 p-3 border bo rder-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          {/* <input type="file" required /> */}

          <label htmlFor="dropdown" className="block mb-2 font-medium">
            What did you like about this cafe:
          </label>
          <div className=" rounded p-4 w-full grid grid-cols-2">
            {options.map((option) => (
              <div
                key={option.value}
                id={option.value}
                value={option.value}
                onClick={() => handleCheckboxChange(option.label)}
                className={`cursor-pointer w-fit mb-2 px-4 py-2 rounded-lg border transition ${
                  selectedOptions.includes(option.value)
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300"
                }`}
              >
                {option.label}
              </div>
            ))}
          </div>
          {selectedOptions.length > 0 && (
            <div className="mt-4">
              <ul className="list-disc pl-6 w-fit grid grid-cols-2 ">
                {selectedOptions.map((option, index) => (
                  <li
                    key={index}
                    className="bg-blue-300 rounded-xl py-1 px-2 m-2 text-white"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <label className="block text-sm font-medium text-gray-700">
            Rating
          </label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`text-2xl ${
                  star <= (hover || rating) ? "star full" : "star"
                }`}
                onClick={() => handleRatingClick(star)} // Handle toggle logic
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                ★
              </button>
            ))}
          </div>
          {error && <div className="text-red-500 text-sm mt-1">{error}</div>}

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-color-button text-white px-6 py-3 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Add Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddReview;
