import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import styled from "styled-components";
import { fetchUserOrdersByOrderId } from "../store/actions/userOrdersActions";

const ShippingAddressContainer = styled.div`
  white-space: pre-line;
`;
const YourOrdersHeading = styled.h2`
  margin-top: 50px;
  margin-bottom: 20px;
  margin-left: 520px;
`;

const ShippingAddressLine = styled.div`
  margin-bottom: 5px;
`;

const OrderDetailsSection = styled.div`
  display: inline-block;
  vertical-align: top;
  margin-right: 130px;
`;

const OrderDetailsPageContainer = styled.div`
  padding: 20px;
`;

const OrderHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: left;
  align-items: left;
  font-size: 18px;
  margin-left: 520px;
`;

const OrderHeaderItem = styled.div`
  margin-right: 10px;
`;

const ShippingMessage = styled.div`
  margin-bottom: 20px;
  text-align: center;
  font-size: 20px;
`;

const OrderDetailsBox = styled.div`
  padding: 20px;
  margin-bottom: 20px;
  border: 2px solid #ccc;
  width: 1100px;
  margin-left: 500px;
  box-shadow: 5px 10px 8px #888888;
`;

const ProductContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProductImageDeliveryContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ProductImageContainer = styled.div`
  width: 170px;
  height: 300px;
  margin-right: 20px;
  margin-left: 20px;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* Ensure that the image doesn't overflow the container */
`;

const ProductImage = styled.img`
  display: flex;
  max-width: 110%;
  max-height: 100%;
  margin-top: 20px;
  object-fit: cover; /* Scale the image to fit inside the container without cropping */
`;

const ProductDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProductDescription = styled.div`
  display: flex;
  white-space: pre-wrap; /* Allow the text to wrap */
  margin-left: 10px;
`;

const DeliveryStatus = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 25px;
  color: black;
  background-color: white;
  padding: 5px 10px;
  border-radius: 5px;
  margin-left: 10px;
  margin-top: 20px;
`;

const OrderDetailsPage = () => {
  const { userId, orderid } = useParams();
  const dispatch = useDispatch();
  const { userOrder, loading, error } = useSelector(
    (state) => state.userOrdersByOrderId
  );

  const [shippingStatuses, setshippingStatuses] = useState([]);
  useEffect(() => {
    dispatch(fetchUserOrdersByOrderId(userId, orderid));
  }, [dispatch, userId, orderid]);

  if (loading) {
    return (
      <>
        <NavigationBar />
        <OrderDetailsPageContainer>Loading...</OrderDetailsPageContainer>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavigationBar />
        <OrderDetailsPageContainer>Error: {error}</OrderDetailsPageContainer>
      </>
    );
  }

  const baseURL = "http://ec2-18-206-126-242.compute-1.amazonaws.com:3001";

  return (
    <>
      <NavigationBar />

      <YourOrdersHeading>Order Details</YourOrdersHeading>
      <OrderHeader>
        <OrderHeaderItem>Ordered on</OrderHeaderItem>
        <OrderHeaderItem>
          {userOrder &&
            userOrder.length > 0 &&
            new Date(userOrder[0].create_date).toDateString()}
        </OrderHeaderItem>
        <OrderHeaderItem>|</OrderHeaderItem>
        <OrderHeaderItem>
          Order # {userOrder && userOrder.length > 0 && userOrder[0].order_id}
        </OrderHeaderItem>
      </OrderHeader>
      <OrderDetailsPageContainer>
        {userOrder && userOrder.length > 0 && userOrder[0] && (
          <>
            <ShippingMessage>{shippingStatuses}</ShippingMessage>
            <OrderDetailsBox>
              <OrderDetailsSection>
                <h2>Shipping Address</h2>
                <ShippingAddressContainer>
                  {userOrder[0].shipping_address
                    .split(", ")
                    .map((line, index) => (
                      <ShippingAddressLine key={index}>
                        {line}
                      </ShippingAddressLine>
                    ))}
                </ShippingAddressContainer>
              </OrderDetailsSection>
              <OrderDetailsSection>
                <h2>Payment method</h2>
                <p>{userOrder[0].order_payment_type}</p>
              </OrderDetailsSection>
              <OrderDetailsSection>
                <h2>Order Summary</h2>
                <p>Item(s) Total Price: ${userOrder[0].order_price}</p>
                <p>Shipping Fee: $10.0</p>
                <p>Platform Fee: $5.0</p>
                <p>Total before tax: ${userOrder[0].order_price}</p>
                <p>
                  Estimated tax to be collected: ${userOrder[0].estimated_tax}
                </p>
                <p>Total Amount: ${userOrder[0].total_order_price_with_tax}</p>
              </OrderDetailsSection>
            </OrderDetailsBox>
            <OrderDetailsBox>
              {userOrder.map((order, index) => (
                <div key={index}>
                  <ProductContainer>
                    <ProductImageDeliveryContainer>
                      <DeliveryStatus>{order.delivery_status}</DeliveryStatus>
                      <ProductImageContainer>
                        <ProductImage
                          src={`${baseURL}${order.product_image_url}`}
                          alt={order.product_name}
                        />
                      </ProductImageContainer>
                    </ProductImageDeliveryContainer>
                    <ProductDescriptionContainer>
                      <ProductDescription>
                        {order.product_description}
                      </ProductDescription>
                    </ProductDescriptionContainer>
                  </ProductContainer>
                </div>
              ))}
            </OrderDetailsBox>
          </>
        )}
      </OrderDetailsPageContainer>
    </>
  );
};

export default OrderDetailsPage;
