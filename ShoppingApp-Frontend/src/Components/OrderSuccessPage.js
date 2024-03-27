import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import NavigationBar from "./NavigationBar";
import { deleteCartByUserId } from "../store/actions/userCartActions";
import Cookies from "js-cookie";
import styled from "styled-components"; // Import styled-components

const user_id = Cookies.get("userID");

// Define styled components
const Heading = styled.h1`
  color: #333;
  font-size: 26px;
  margin-top: 10px;
  text-align: center; /* Center text horizontally */
`;

const Paragraph = styled.p`
  color: #666;
  font-size: 18px;
  margin-top: 10px;
  text-align: center; /* Center text horizontally */
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Center items horizontally */
  justify-content: center; /* Center items vertically */
  height: 20vh; /* Make the container take up the full viewport height */
`;

const OrderSuccessPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(deleteCartByUserId(user_id)); // Make sure to define user_id
  }, [dispatch]);

  return (
    <>
      <NavigationBar />
      <Container>
        {/* Use the styled components */}
        <Heading>Order Placed Successfully!</Heading>
        <Paragraph>Thank you for shopping with us.</Paragraph>
        {/* You can add more details or options here */}
      </Container>
    </>
  );
};

export default OrderSuccessPage;
