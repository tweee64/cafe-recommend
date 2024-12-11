import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddReview from "./AddReview";
import Modal from "../components/Modal";
import axios from "axios";
import AddReviewConfirm from "./AddReviewConfirm";
import Login from "../components/Login";
import Register from "../components/Register";
import avatar from "../assets/avatar.jpeg";

const CafeDetail = () => {
  const { id } = useParams();
  const cafes = useSelector((state) => state.cafes.cafes);
  const [cafe, setCafe] = useState(null); // Initial state as null
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewList, setReviewList] = useState([]);
  const [averageRating, setAverageRating] = useState();
  const [uniqueComments, setUniqueComments] = useState([]);
  const [isReviewAdded, setIsReviewAdded] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState();
  const [isLogin, setisLogin] = useState(true);
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      try {
        const user = JSON.parse(loggedUser);
        setUser(user); // Set the user data in state
      } catch (error) {
        console.log("Error parsing user data from localStorage:", error);
      }
    }
    setLoading(false); // Once the check is done, set loading to false
  }, []);

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
      stars.push(<span className="star full text-sm">&#9733;</span>);
    }
    for (let i = 0; i < totalStars - Math.floor(rating); i++) {
      stars.push(<span className="star text-sm">&#9733;</span>);
    }
    return stars;
  };
  const openLoginModal = () => {
    setIsModalLoginOpen(true);
  };

  const openSignUp = () => {
    setisLogin(false);
    setIsModalOpen(true);
  };

  const openLogin = () => {
    setisLogin(true);
    setIsModalOpen(true);
  };
  const roundedRating = Math.round(averageRating * 2) / 2;
  console.log(roundedRating);
  const averageStar = Array.from({ length: 5 }, (_, index) => {
    const starIndex = index + 1;
    if (starIndex <= roundedRating) {
      return "full";
    } else if (
      starIndex === Math.ceil(roundedRating) &&
      roundedRating % 1 !== 0
    ) {
      return "half";
    } else {
      return "empty";
    }
  });
  useEffect(() => {
    const newCafe = cafes.find((cafe) => cafe._id === id);
    setCafe(newCafe);
  }, [id, cafes]);

  useEffect(() => {
    const apiUrl = `${import.meta.env.VITE_API_URL}`;
    axios
      .get(`${apiUrl}get-reviews/${id}`)
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

        console.log("unique", uniqueComments);
        // Calculate and set the average rating
        const averageRating = (totalRatings / reviews.length).toFixed(1);
        setAverageRating(averageRating);
      })
      .catch((error) => console.error("Error fetching data", error)); // Always good to handle errors
  }, []); // Empty dependency array means this effect runs only once when the component mounts
  if (!cafe) {
    return <div>Loading..</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-16 lg:px-24 ">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="md:w-1/2  md:px-8 h-96 flex justify-center shadow-md ">
          <img src={cafe.image} alt={cafe.image} className="" />
        </div>
        <div className="md:w-1/2 md:px-8 md:py-4 flex flex-col items-center gap-y-1 shadow-md">
          {" "}
          <h1 className="text-2xl font-bold">{cafe.name}</h1>
          <div className="inline-flex space-x-2">
            <p className="font-bold text-gray-600 text-lg">
              {isNaN(averageRating) ? "0.0" : averageRating}
            </p>
            <div className="inline-flex">
              {averageStar.map((star, index) => (
                <span key={index} className={`star ${star}`}>
                  &#9733;
                </span>
              ))}
            </div>
          </div>
          <p className="text-gray-700">{cafe.address}</p>
          <p className="text-gray-500">{cafe.description}</p>
          {uniqueComments.length > 0 ? (
            <div className="list-disc pl-6 flex flex-row">
              {uniqueComments.map(({ key, value }, index) => (
                <div
                  key={index}
                  className="border rounded-xl py-1 px-2 mx-2 text-font-main"
                >
                  #{key}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No hashtag available.</p>
          )}
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={() => openInGoogleMaps(cafe.address)}
              className="bg-color-button text-white py-2 px-4 rounded-lg hover:bg-red-500"
            >
              View on maps
            </button>
            <button className="bg-color-button text-white py-2 px-4 rounded-lg hover:bg-red-500">
              +44 1903 815757
            </button>
          </div>
          <div className="mt-6">
            <p className="text-gray-500 text-sm mt-1">
              We would love to hear more about your experience!
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-font-main text-sm mt-2"
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
              className="text-font-main text-sm font-medium hover:underline"
            >
              View all ({reviewList.length})
            </a>
          </div>

          {reviewList.length > 0 ? (
            reviewList.map((review, index) => (
              <div key={index} className="flex items-start ">
                <img
                  src={avatar}
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
                  <div className="mb-1">{renderStars(review.rating)}</div>
                  <p className="text-sm text-gray-600 mb-1">{review.review}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No reviews available for this restaurant.</p>
          )}
        </div>
      </div>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        {!isReviewAdded && user ? (
          <AddReview
            user={user}
            cafeId={cafe._id}
            cafeName={cafe.name}
            onReviewAdded={() => setIsReviewAdded(true)} // Callback to update review status
          ></AddReview>
        ) : !user ? (
          <div>
            Please{" "}
            <button
              className="font-bold text-font-main"
              onClick={openLoginModal}
            >
              Log In
            </button>{" "}
            first before writing review
          </div>
        ) : isReviewAdded ? (
          <AddReviewConfirm
            onConfirm={() => {
              setIsModalOpen(false); // Close modal after confirmation
              setIsReviewAdded(false);
              window.location.reload(); // Reload the current page
            }}
          />
        ) : (
          <div>unknown</div>
        )}
      </Modal>
      <Modal
        isModalOpen={isModalLoginOpen}
        setIsModalOpen={setIsModalLoginOpen}
      >
        {isLogin ? (
          <Login openSignUp={openSignUp} setIsModalOpen={setIsModalOpen} />
        ) : (
          <Register openLogin={openLogin} />
        )}{" "}
      </Modal>
    </div>
  );
};

export default CafeDetail;
