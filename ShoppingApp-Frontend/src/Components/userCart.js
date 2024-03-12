import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import NavigationBar from "./NavigationBar";
import { getCartByUserId } from "../store/actions/userCartActions";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ShoppingCartHeading = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const CartItemContainer = styled.div`
  width: 80%;
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 20px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductImage = styled.img`
  width: 120px;
  height: 150px;
  object-fit: contain;
  margin-right: 20px;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 5px;
`;

const ProductPrice = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
`;

const ProductQuantity = styled.p`
  font-size: 16px;
`;

const PriceDetails = styled.div`
  width: 80%;
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 20px;
`;

const TotalPrice = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
`;

const ShippingFee = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
`;

const PlatformFee = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
`;

const TotalAmount = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const CartPage = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { loading, cartItems, error } = useSelector((state) => state.userCart);

  useEffect(() => {
    dispatch(getCartByUserId(userId));
  }, [dispatch, userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !cartItems) {
    return <div>Error: {error}</div>;
  }

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product_price * item.product_quantity,
    0
  );

  // Sample shipping and platform fees
  const shippingFee = 10.0;
  const platformFee = 5.0;
  const totalAmount = totalPrice + shippingFee + platformFee;
  const baseURL = "http://localhost:3001";
  return (
    <>
      <NavigationBar />
      <Container>
        <ShoppingCartHeading>Shopping Bag</ShoppingCartHeading>
        {cartItems.map((item) => (
          <CartItemContainer key={item.id}>
            <CartItem>
              <ProductImage
                src={`${baseURL}${item.product_image_url}`}
                alt={item.product_name}
              />
              <ProductInfo>
                <ProductTitle>{item.product_brand_name}</ProductTitle>
                <ProductPrice>Price: ${item.product_price}</ProductPrice>
                <ProductQuantity>
                  Quantity: {item.product_quantity}
                </ProductQuantity>
              </ProductInfo>
            </CartItem>
          </CartItemContainer>
        ))}
        <PriceDetails>
          <TotalPrice>Total Price: ${totalPrice.toFixed(2)}</TotalPrice>
          <ShippingFee>Shipping Fee: ${shippingFee.toFixed(2)}</ShippingFee>
          <PlatformFee>Platform Fee: ${platformFee.toFixed(2)}</PlatformFee>
          <TotalAmount>Total Amount: ${totalAmount.toFixed(2)}</TotalAmount>
        </PriceDetails>
      </Container>
    </>
  );
};

export default CartPage;
