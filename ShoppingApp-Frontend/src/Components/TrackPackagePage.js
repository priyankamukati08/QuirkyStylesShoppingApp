import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchUserOrdersByOrderId } from "../store/actions/userOrdersActions";
import { Stepper, Step } from "react-form-stepper";

const OrderDetailsPageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 75vh; /* Set fixed height for both images */
  background-image: url("/mapimage.jpeg");
`;

const WindowContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%; // Adjust width as needed
  height: 71vh; // Adjust height as needed
  background-color: rgba(255, 255, 255, 1); // Fully opaque white color
  border: 2px solid #0052cc; // Blue border
  border-radius: 10px;
  padding: 20px;
  position: fixed; // Position the container relative to the viewport
  top: 20px; // Adjust the top position as needed
  left: 20px; // Adjust the left position as needed
  justify-content: space-around;
  overflow: hidden;
`;

const YourOrdersHeading = styled.h2`
  margin: 10px; // Adjust margin as needed
  position: absolute;
  top: 5%; // Adjust top position as needed
  left: 12%; // Adjust left position as needed
  transform: translate(-50%, -50%); // Center the heading
  font-size: 30px;
`;

const CustomStepper = styled(Stepper)`
  display: flex;
  margin-top: 50px;
  margin-left: -60px;
  font-size: 20px;
`;

const CircleStep = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? "#0052cc" : "#ccc")};
  color: ${({ active }) => (active ? "#fff" : "#000")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  z-index: 1;
`;

const ProductImageContainer = styled.div`
  display: flex;
  width: 170px;
  height: 300px;
  margin-top: 10px;
  margin-left: 50px;
  overflow: hidden; /* Ensure that the image doesn't overflow the container */
`;

const ProductImage = styled.img`
  display: flex;
  max-width: 110%;
  max-height: 100%;
  margin-top: 20px;
  object-fit: cover; /* Scale the image to fit inside the container without cropping */
`;
const DeliveryMessage = styled.div`
  display: flex;
  margin-top: 50px;
  margin-left: 50px;
  font-size: 20px;
`;

const TrackPackagePage = () => {
  const { userId, orderid } = useParams();
  const dispatch = useDispatch();
  const { userOrder, loading, error } = useSelector(
    (state) => state.userOrdersByOrderId
  );
  const connectorStyleConfig = {
    activeColor: "#1323EB",
    completedColor: "#1323EB",
  };

  useEffect(() => {
    dispatch(fetchUserOrdersByOrderId(userId, orderid));
  }, [dispatch, userId, orderid]);

  const deliveryStatusSteps = [
    { label: "Ordered" },
    { label: "Processing" },
    { label: "Shipped" },
    { label: "In Transit" },
    { label: "Out for Delivery" },
    { label: "Delivered" },
  ];

  const getCurrentStatusIndex = () => {
    if (!userOrder || !userOrder.length) return -1;

    const status = userOrder[0].delivery_status;

    switch (status) {
      case "Ordered":
        return 0;
      case "Processing":
        return 1;
      case "Shipped":
        return 2;
      case "In Transit":
        return 3;
      case "Out for Delivery":
        return 4;
      case "Delivered":
        return 5;
      default:
        return -1;
    }
  };

  const renderProgressTracker = () => {
    const completedSteps = getCurrentStatusIndex();

    const renderedSteps = deliveryStatusSteps.map((step, index) => (
      <Step key={index} label={step.label} completed={index <= completedSteps}>
        <CircleStep active={index <= completedSteps}>
          {index <= completedSteps ? "✔" : ""}
        </CircleStep>
      </Step>
    ));

    return (
      <CustomStepper connectorStyleConfig={connectorStyleConfig}>
        {renderedSteps}
      </CustomStepper>
    );
  };
  const renderDeliveryMessage = () => {
    if (userOrder && userOrder.length > 0) {
      const deliveryDate = userOrder[0].create_date;

      if (userOrder[0].delivery_status === "Delivered") {
        return (
          <div>
            Delivered {new Date(deliveryDate).toLocaleDateString()}
            <br />
            Your package was left near the front door or porch.
          </div>
        );
      }
    }
    return null;
  };
    const baseURL = "http://localhost:3001";

  return (
    <>
      <OrderDetailsPageContainer></OrderDetailsPageContainer>
      <WindowContainer>
        <YourOrdersHeading>Track Package</YourOrdersHeading>
        <DeliveryMessage>{renderDeliveryMessage()}</DeliveryMessage>

        {userOrder && userOrder.length > 0 && (
          <ProductImageContainer>
            <ProductImage
              src={`${baseURL}${userOrder[0].product_image_url}`}
              alt={userOrder[0].product_name}
            />
          </ProductImageContainer>
        )}
        {renderProgressTracker()}
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <>
            <div>{/* Display order details here */}</div>
          </>
        )}
      </WindowContainer>
    </>
  );
};

export default TrackPackagePage;
