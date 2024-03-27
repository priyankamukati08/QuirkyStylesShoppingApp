import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomToastContainer = styled(ToastContainer)`
  .Toastify__toast-container {
    font-family: Arial, sans-serif;
    z-index: 9999;
    background-color: #333;
    color: #fff;
  }

  .Toastify__toast {
    font-size: 16px;
    background-color: #444;
    color: #fff;
  }

  .Toastify__close-button {
    color: #fff;
  }
`;

const App = () => {
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message) => {
    setToastMessage(message); // Set the toast message
  };

  useEffect(() => {
    if (toastMessage) {
      // If toastMessage is not empty, show the toast message
      toast.info(toastMessage); // Display info toast message
    }
  }, [toastMessage]); // Listen for changes in toastMessage

  return (
    <>
      <CustomToastContainer />
      {/* Example button to trigger a toast message */}
      <button onClick={() => showToast("This is a toast message")}>
        Show Toast
      </button>
    </>
  );
};

export default App;
