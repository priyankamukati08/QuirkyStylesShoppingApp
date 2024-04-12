import React from "react";
import NavigationBar from "./NavigationBar";
import Cookies from "js-cookie";
import styled from "styled-components";


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
 
  return (
    <>
      <NavigationBar />
      <Container>
        <Heading>Order Placed Successfully!</Heading>
        <Paragraph>Thank you for shopping with us.</Paragraph>
      </Container>
    </>
  );
};

export default OrderSuccessPage;
