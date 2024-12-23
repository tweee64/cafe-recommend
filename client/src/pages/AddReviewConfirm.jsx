import React from "react";

function AddReviewConfirm({ onConfirm }) {
  return (
    <div className="text-center">
      <h1 className="m-2">Your review has been successfully added.</h1>
      <button
        className="bg-color-button text-white py-2 px-4 rounded-lg hover:bg-red-500"
        onClick={onConfirm}
      >
        Confirm
      </button>
    </div>
  );
}

export default AddReviewConfirm;
