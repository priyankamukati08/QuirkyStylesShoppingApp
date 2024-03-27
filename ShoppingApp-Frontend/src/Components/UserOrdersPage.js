import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavigationBar from "./NavigationBar";
import { fetchUserOrders } from "../store/actions/userOrdersActions";
import Cookies from "js-cookie";
import styled from "styled-components";

const OrderPageContainer = styled.div`
  padding: 20px;
`;

const OrderItem = styled.div`
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

const OrderImage = styled.img`
  width: 100px; /* Adjust the size as needed */
  height: auto; /* Maintain aspect ratio */
`;

const OrderDetails = styled.div`
  margin-bottom: 20px;
`;

const OrderDetailLabel = styled.strong`
  margin-right: 5px;
`;

const ProductDetail = styled.div`
  margin-bottom: 65px;
`;

const ProductImage = styled.img`
  width: 90px;
  height: 120px;
`;

const OrderPage = () => {
  const dispatch = useDispatch();
  const { loading, userOrders, error } = useSelector(
    (state) => state.userOrders
  );
  const userID = Cookies.get("userID");

  useEffect(() => {
    if (userID) {
      dispatch(fetchUserOrders(userID));
    }
  }, [dispatch, userID]);

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
        <h2>Your Orders</h2>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {Object.values(groupedOrders).map(({ orderDetails, products }) => (
          <OrderItem key={orderDetails.order_id}>
            <OrderDetails>
              <OrderDetailLabel>Order ID:</OrderDetailLabel>
              {orderDetails.order_id}
            </OrderDetails>
            <OrderDetails>
              <OrderDetailLabel>Status:</OrderDetailLabel>
              {orderDetails.status}
            </OrderDetails>
            <OrderDetails>
              <OrderDetailLabel>Order Date:</OrderDetailLabel>
              {orderDetails.order_date}
            </OrderDetails>
            <OrderDetails>
              <OrderDetailLabel>Total Price:</OrderDetailLabel>
              {orderDetails.total_price}
            </OrderDetails>
            <OrderDetails>
              <OrderDetailLabel>Shipping Address:</OrderDetailLabel>
              {orderDetails.shipping_address}
            </OrderDetails>
            <OrderDetails>
              <OrderDetailLabel>Billing Address:</OrderDetailLabel>
              {orderDetails.billing_address}
            </OrderDetails>
            <OrderDetails>
              <OrderDetailLabel>Payment Method:</OrderDetailLabel>
              {orderDetails.order_payment_type}
            </OrderDetails>
            <OrderDetails>
              <OrderDetailLabel>Delivery Status:</OrderDetailLabel>
              {orderDetails.delivery_status}
            </OrderDetails>
            <OrderDetails>
              <OrderDetailLabel>Order Notes:</OrderDetailLabel>
              {orderDetails.order_notes}
            </OrderDetails>
            {products.map((product, index) => (
              <ProductDetail key={product.product_id}>
                <ProductImage
                  src={`${baseURL}${product.product_image_url}`}
                  alt={product.product_name}
                />
                <div>
                  <strong>Size:</strong> {product.product_size}
                </div>
                <div>
                  <strong>Brand:</strong> {product.product_brand_name}
                </div>
                <div>
                  <strong>Description:</strong> {product.product_description}
                </div>
                <div>
                  <strong>Price:</strong> {product.product_price}
                </div>
                <div>
                  <strong>Quantity:</strong> {product.product_quantity}
                </div>
                {index !== products.length - 1 && <hr />} {/* Render the horizontal line if not the last product */}
              </ProductDetail>
            ))}
          </OrderItem>
        ))}
      </OrderPageContainer>
    </>
  );
};

export default OrderPage;
