import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import NavigationBar from "./NavigationBar";
import { getCartByUserId } from "../store/actions/userCartActions";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import NavigationBarforcheckoutpage from "./Navigationbarforcheckout";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ShoppingCartHeading = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const ShoppingCartHeadingWhenEmpty = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  margin-left: 950px;
`;
const ShoppingCartHeadingWhenEmpty1 = styled.h1`
  font-size: 26px;
  margin-top: 50px;
  margin-left: 810px;
  color: #e60026;
`;

const CartItemContainer = styled.div`
  display: flex;
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 20px;
  width: 45%;
  margin-right: 350px;
  box-shadow: 5px 10px 8px #888888;
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

const PriceDetailsContainer = styled.div`
  position: fixed;
  top: 200px;
  right: 150px;
  width: 26%;
  box-shadow: 5px 10px 8px #888888;
`;

const PriceDetails = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
`;

const PriceDetailsHeading = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
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

const CartPage = () => {
  const dispatch = useDispatch();
  const { loading, cartItems, error } = useSelector((state) => state.userCart);
  const userID = Cookies.get("userID");
  const navigate = useNavigate(); // Initialize useNavigate

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

  if (!cartItems || cartItems.length === 0) {
    return (
      <>
        <NavigationBar></NavigationBar>
        <ShoppingCartHeadingWhenEmpty>
          Shopping Bag
        </ShoppingCartHeadingWhenEmpty>
        <ShoppingCartHeadingWhenEmpty1>
          Your cart is empty. Start shopping now!
        </ShoppingCartHeadingWhenEmpty1>
      </>
    );
  }

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product_price * item.product_quantity,
    0
  );
  const shippingFee = 10.0;
  const platformFee = 5.0;
  const totalAmount = totalPrice + shippingFee + platformFee;

  const placeOrder = () => {
    navigate("/checkout", { state: { cartItems: cartItems } });
  };

    const baseURL = "http://ec2-44-202-87-215.compute-1.amazonaws.com:3001";

  return (
    <>
      <NavigationBarforcheckoutpage userAuthRequired={true} />
      <Container>
        <ShoppingCartHeading>Shopping Bag</ShoppingCartHeading>
        {cartItems.map((item) => (
          <CartItemContainer key={item.id}>
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
              <ProductPrice>Size: {item.product_size}</ProductPrice>
              <ProductQuantity>
                Quantity: {item.product_quantity}
              </ProductQuantity>
            </ProductInfo>
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
            <PlaceOrderButton onClick={placeOrder}>
              Proceed to Checkout
            </PlaceOrderButton>
          </PriceDetails>
        </PriceDetailsContainer>
      </Container>
    </>
  );
};

export default CartPage;
