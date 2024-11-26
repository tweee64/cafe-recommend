import React from "react";

function AddReviewConfirm({ onConfirm }) {
  return (
    <div className="text-center">
      <h1 className="m-2">Your review has been successfully added.</h1>
      <button
        className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
        onClick={onConfirm}
      >
        Confirm
      </button>
    </div>
  );
}

export default AddReviewConfirm;
