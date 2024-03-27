import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomToastContainer = ({ style, ...props }) => (
  <ToastContainer
    theme="dark"
    style={{ ...style, marginTop: "110px" }}
    {...props}
  />
);

const CustomToast = ({ message, productImage }) => {
  useEffect(() => {
    if (message) {
      // Use the toast function with a custom JSX content
      toast(
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "auto",
            fontSize: "20px",
            // Change width to auto to allow it to expand as needed
          }}
        >
          {productImage && (
            <img
              src={productImage}
              alt="Product"
              style={{ width: "60px", height: "80px", marginRight: "10px" }}
            />
          )}
          <span>{message}</span>
        </div>
      );
    }
  }, [message, productImage]);

  return <CustomToastContainer />;
};

export default CustomToast;
