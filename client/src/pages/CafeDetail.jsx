import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddReview from "./AddReview";
import Modal from "../components/Modal";
import axios from "axios";
import AddReviewConfirm from "./AddReviewConfirm";

const CafeDetail = () => {
  const { id } = useParams();
  const cafes = useSelector((state) => state.cafes.cafes);
  const [cafe, setCafe] = useState(null); // Initial state as null
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewList, setReviewList] = useState([]);
  const [averageRating, setAverageRating] = useState();
  const [uniqueComments, setUniqueComments] = useState([]);
  const [isReviewAdded, setIsReviewAdded] = useState(false);

  const openInGoogleMaps = (address) => {
    if (!address) {
      console.error("Address is required to open in Google Maps.");
      return;
    }
    const encodedAddress = encodeURIComponent(address);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(googleMapsUrl, "_blank");
  };
  const renderStars = (rating) => {
    const totalStars = 5;
    let stars = [];
    for (let i = 0; i < Math.floor(rating); i++) {
      stars.push(<span className="text-yellow-500 text-sm">&#9733;</span>);
    }
    for (let i = 0; i < totalStars - Math.floor(rating); i++) {
      stars.push(<span className="text-gray-400 text-sm">&#9733;</span>);
    }
    return stars;
  };
  useEffect(() => {
    const newCafe = cafes.find((cafe) => cafe._id === id);
    setCafe(newCafe);
  }, [id, cafes]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/get-reviews/${id}`)
      .then((result) => {
        console.log("result", result);
        const reviews = result.data.reviews;
        setReviewList(reviews);
        const totalRatings = reviews.reduce(
          (sum, review) => sum + review.rating,
          0
        );
        const allItems = [];
        for (let item of reviews) {
          for (let i = 0; i < item.selectedOptions.length; i++) {
            // if (!uniqueCommentSets.includes(item.selectedOptions[i])) {
            allItems.push(item.selectedOptions[i]);
            // }
          }
        }
        console.log("allItems", allItems);
        const frequencyMap = {};
        allItems.forEach((item) => {
          frequencyMap[item] = (frequencyMap[item] || 0) + 1;
        });

        // Sort and extract the top three items
        const topThree = Object.entries(frequencyMap)
          .map(([key, value]) => ({ key, value }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 3);

        setUniqueComments(topThree);

        // setUniqueComments(uniqueCommentSets);
        console.log("unique", uniqueComments);
        // Calculate and set the average rating
        const averageRating = (totalRatings / reviews.length).toFixed(1);
        setAverageRating(averageRating);
      })
      .catch((error) => console.error("Error fetching data", error)); // Always good to handle errors
  }, []); // Empty dependency array means this effect runs only once when the component mounts
  if (!cafe) {
    return <div>Loading..</div>; // Or you can show a loading state
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-16 lg:px-24 ">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="md:w-1/2  md:px-8 h-96 flex justify-center shadow-md ">
          <img src={cafe.image} alt={cafe.image} className="" />
        </div>
        <div className="md:-1/2 md:px-8 md:py-4 flex flex-col items-center gap-y-1 shadow-md">
          {" "}
          <h2 className="text-2xl font-bold">{cafe.name}</h2>
          <p className="text-gray-500">{cafe.address}</p>
          <p className="text-gray-500 font-semibold">
            From 10:00 AM to 11:00 PM
          </p>
          <p className="text-gray-500">{cafe.description}</p>
          {uniqueComments.length > 0 ? (
            <ul className="list-disc pl-6 flex flex-row">
              {uniqueComments.map(({ key, value }, index) => (
                <li
                  key={index}
                  className="bg-blue-300 rounded-xl py-1 px-2 mx-2 text-white"
                >
                  {key}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No hashtag available.</p>
          )}
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={() => openInGoogleMaps(cafe.address)}
              className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
            >
              View on maps
            </button>
            <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600">
              +44 1903 815757
            </button>
          </div>
          <div className="mt-6">
            <p className="text-gray-500 text-sm mt-1">
              We would love to hear more about your experience!
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-yellow-500 text-sm mt-2"
            >
              Write a review
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="reviews-section bg-white mt-6 p-4 px-60 rounded-lg border-t  mx-auto">
          <div className=" flex justify-between items-center mb-4 ">
            <h3 className="text-lg font-semibold text-gray-800">Reviews</h3>
            <a
              href="#"
              className="text-yellow-500 text-sm font-medium hover:underline"
            >
              View all ({reviewList.length})
            </a>
          </div>

          {reviewList.length > 0 ? (
            reviewList.map((review, index) => (
              <div key={index} className="flex items-start">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Reviewer"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="text-sm font-semibold text-gray-800">
                    {review.reviewerName}
                  </h4>
                  {/* <p class="text-xs text-gray-500">
                    51 Reviews, 125k Followers
                  </p> */}
                  <div className="mb-2">{renderStars(review.rating)}</div>
                  <p className="text-sm text-gray-600 mt-2">{review.review}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No reviews available for this restaurant.</p>
          )}
        </div>
      </div>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        {!isReviewAdded ? (
          <AddReview
            cafeId={cafe._id}
            cafeName={cafe.name}
            onReviewAdded={() => setIsReviewAdded(true)} // Callback to update review status
          ></AddReview>
        ) : (
          <AddReviewConfirm
            onConfirm={() => {
              setIsModalOpen(false); // Close modal after confirmation
              setIsReviewAdded(false);
              window.location.reload(); // Reload the current page
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default CafeDetail;
