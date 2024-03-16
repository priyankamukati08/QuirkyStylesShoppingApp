import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import NavigationBar from "./NavigationBar";
import { getCartByUserId } from "../store/actions/userCartActions";
import Cookies from "js-cookie";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ShoppingCartHeading = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const PriceDetailsHeading = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

const CartItemContainer = styled.div`
  display: flex;
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 20px;
  width: 45%;
  margin-right: 350px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ProductImage = styled.img`
  width: 200px;
  height: 300px;
  object-fit: contain;
  margin-right: 20px;
`;

const ProductInfo = styled.div`
  flex: 1;
  margin-top: 1px;
`;

const ProductTitle = styled.h3`
  font-size: 22px;
`;
const ProductDescription = styled.p`
  font-size: 18px;
  margin-bottom: 5px;
`;

const ProductPrice = styled.p`
  font-size: 20px;
  margin-bottom: 5px;
`;

const ProductQuantity = styled.p`
  font-size: 18px;
`;

const PriceDetailsContainer = styled.div`
  position: fixed; /* Position the container fixed to the viewport */
  top: 210px; /* Adjust the top position */
  right: 150px; /* Adjust the right position */
  width: 26%;
`;

const PriceDetails = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
`;

const TotalPrice = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ShippingFee = styled.p`
  font-size: 18px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PlatformFee = styled.p`
  font-size: 18px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalAmount = styled.p`
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PlaceOrderButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #f04878;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
`;

const CartPage = () => {
  const dispatch = useDispatch();
  const { loading, cartItems, error } = useSelector((state) => state.userCart);
  const userID = Cookies.get("userID");

  useEffect(() => {
    if (userID) {
      dispatch(getCartByUserId(userID));
    }
  }, [dispatch, userID]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !cartItems) {
    return <div>Error: {error}</div>;
  }

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product_price * item.product_quantity,
    0
  );
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
                <ProductDescription>
                  {item.product_description}
                </ProductDescription>
                <ProductPrice>Price: ${item.product_price}</ProductPrice>
                <ProductQuantity>
                  Quantity: {item.product_quantity}
                </ProductQuantity>
              </ProductInfo>
            </CartItem>
          </CartItemContainer>
        ))}
        <PriceDetailsContainer>
          <PriceDetails>
            <PriceDetailsHeading>
              PRICE DETAILS ({cartItems.length} Items)
            </PriceDetailsHeading>
            <TotalPrice>
              <span>Total Price:</span> ${totalPrice.toFixed(2)}
            </TotalPrice>
            <ShippingFee>
              <span>Shipping Fee:</span> ${shippingFee.toFixed(2)}
            </ShippingFee>
            <PlatformFee>
              <span>Platform Fee:</span> ${platformFee.toFixed(2)}
            </PlatformFee>
            <hr />
            <TotalAmount>
              <span>Total Amount:</span> ${totalAmount.toFixed(2)}
            </TotalAmount>
            <PlaceOrderButton>PLACE ORDER</PlaceOrderButton>
          </PriceDetails>
        </PriceDetailsContainer>
      </Container>
    </>
  );
};

export default CartPage;
