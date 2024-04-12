import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavigationBar from "./NavigationBar";
import Cookies from "js-cookie";
import styled from "styled-components";
import {
  fetchUserOrders,
  fetchUserOrdersByOrderId,
} from "../store/actions/userOrdersActions";
import { Link } from "react-router-dom";

const OrderPageContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* Ensures the container takes up at least the full height of the viewport */
`;

const HorizontalLine = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  width: 60%; /* Set the line to full width */
  margin-top: 10px; /* Adjust as needed */
  margin-bottom: 20px;
  margin-left: 470px;
`;

const YourOrdersHeading = styled.h2`
  margin-top: 50px;
  margin-bottom: 20px;
  margin-right: 1055px;
`;

const OrderItem = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 60%;
  margin-bottom: 20px;
  margin-top: 50px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-left: 100px;
  position: relative; /* Add position relative */
  box-shadow: 5px 10px 8px #888888;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd; /* Add bottom border */
  background-color: #eaeded; /* Grey background color */
`;

const OrderDetailLabel = styled.span`
  font-weight: bold;
  margin-right: 5px;
  margin-top: 5px;
`;

const OrderDetailLabel1 = styled.span`
  font-weight: bold;
  margin-right: 5px;
  margin-top: 1px;
  margin-bottom: 20px;
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

const ProductDetail = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProductDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProductDescription = styled.div`
  display: flex;
  white-space: pre-wrap;
  margin-left: 10px;
  color: black;
  font-size: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const TrackPackageButton = styled.button`
  display: flex;
  justify-content: center; /* Align text horizontally in the center */
  align-items: center; /* Align content vertically in the center */
  background-color: white;
  color: black;
  border: 2px solid #ddd;
  border-radius: 5px;
  width: 300px;
  height: 40px;
  margin: 10px;
  cursor: pointer;
  transform: translateY(-50%);
  font-size: 17px;
  box-shadow: 1px 5px 5px #888888;
  margin-top: 30px;
`;

const OrderDetailContainer = styled.div`
  position: relative; /* Ensure relative positioning */
  margin-right: 100px; /* Adjust spacing between elements */
  margin-top: 15px;
`;

const OrderDetailLink = styled(Link)`
  text-decoration: none;
  color: #089595;
  cursor: pointer;
  position: relative;
  font-size: 18px;
  &:after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #007bff;
    visibility: hidden;
    transition: visibility 0s, height 0.3s;
  }
  &:hover:after {
    visibility: visible;
  }
`;

const ShipToContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #089595;
  font-size: 17px;
`;

const DownArrow = styled.span`
  font-size: 10px;
  margin-left: 5px;
  position: relative;
  top: 2px; /* Adjust the vertical position */
`;

const AddressPopup = styled.div`
  position: absolute;
  background-color: #fff;
  color: black;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  top: 20px;
  left: 0;
  font-size: 20px;
  width: 200px;
  height: 150px;
  z-index: 1;
  display: ${(props) => (props.show ? "block" : "none")};
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

const OrderDetail = styled.div`
  display: flex;
  flex-direction: column;
  &:hover ${AddressPopup} {
    display: block;
    margin-top: 30px;
  }
`;

const OrderPage = () => {
  const dispatch = useDispatch();
  const { loading, userOrders, error } = useSelector(
    (state) => state.userOrders
  );

  const userID = Cookies.get("userID");
  const [showFullAddress, setShowFullAddress] = useState(false);
  const [SelectedOrderId, setSelectedOrderId] = useState(null);

  const toggleFullAddress = () => {
    setShowFullAddress(!showFullAddress);
  };

  useEffect(() => {
    if (userID) {
      dispatch(fetchUserOrders(userID));
    }
  }, [dispatch, userID]);

  const handleViewDetails = (orderId) => {
    dispatch(fetchUserOrdersByOrderId(userID, orderId));
    setSelectedOrderId(orderId);
  };

  const baseURL = "http://localhost:3001";

  // Group orders by their order ID
  const groupedOrders = userOrders.reduce((acc, order) => {
    if (!acc[order.order_id]) {
      acc[order.order_id] = {
        orderDetails: order,
        products: [],
      };
    }
    acc[order.order_id].products.push(order);
    return acc;
  }, {});

  return (
    <>
      <NavigationBar />
      <OrderPageContainer>
        <YourOrdersHeading>Your Orders</YourOrdersHeading>
        <HorizontalLine />
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {Object.values(groupedOrders)
          .sort(
            (a, b) =>
              new Date(b.orderDetails.create_date) -
              new Date(a.orderDetails.create_date)
          )
          .map(({ orderDetails, products }) => (
            <OrderItem key={orderDetails.order_id}>
              <OrderHeader>
                <OrderDetail>
                  <OrderDetailLabel>ORDER PLACED</OrderDetailLabel>
                  <p>{new Date(orderDetails.create_date).toDateString()}</p>
                </OrderDetail>
                <OrderDetail>
                  <OrderDetailLabel>TOTAL</OrderDetailLabel>
                  <p>${orderDetails.total_order_price_with_tax}</p>
                </OrderDetail>
                <OrderDetail>
                  <div>
                    <OrderDetailLabel>SHIP TO</OrderDetailLabel>
                    <ShipToContainer onClick={toggleFullAddress}>
                      <p>{orderDetails.shipping_address.split(",")[0]}</p>
                      <DownArrow>▼</DownArrow>
                      <AddressPopup show={showFullAddress}>
                        {orderDetails.shipping_address}
                      </AddressPopup>
                    </ShipToContainer>
                  </div>
                </OrderDetail>
                <OrderDetail>
                  <OrderDetailLabel1>
                    ORDER # {orderDetails.order_id}
                    <OrderDetailContainer>
                      <OrderDetailLink
                        to={`/Ordersdetailspage/${userID}/${orderDetails.order_id}`}
                        onClick={() => handleViewDetails(orderDetails.order_id)}
                      >
                        View order details
                      </OrderDetailLink>
                    </OrderDetailContainer>
                  </OrderDetailLabel1>
                </OrderDetail>
              </OrderHeader>
              {products.map((product) => (
                <ProductDetail key={product.product_id}>
                  <ProductImageDeliveryContainer>
                    <DeliveryStatus>{product.delivery_status}</DeliveryStatus>
                    <ProductImageContainer>
                      <ProductImage
                        src={`${baseURL}${product.product_image_url}`}
                        alt={product.product_name}
                      />
                    </ProductImageContainer>
                  </ProductImageDeliveryContainer>
                  <ProductDescriptionContainer>
                    <ProductDescription>
                      {product.product_description}
                    </ProductDescription>
                  </ProductDescriptionContainer>
                  <ButtonContainer>
                    <Link
                      to={`/TrackPackagePage/${userID}/${orderDetails.order_id}`}
                    >
                      <TrackPackageButton>Track Package</TrackPackageButton>
                    </Link>
                  </ButtonContainer>
                </ProductDetail>
              ))}
            </OrderItem>
          ))}
      </OrderPageContainer>
    </>
  );
};

export default OrderPage;
