import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { addUserOrders } from "../store/actions/userOrdersActions";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import NavigationBarforcheckoutpage from "./Navigationbarforcheckout";
import Modal from "./ModalMessageForAddress"; // Import the Modal component
import { addUserAddress } from "../store/actions/userAddressActions";
import { fetchUserAddress } from "../store/actions/userAddressActions";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const ItemContainer = styled.div`
  padding: 20px;
  margin-bottom: 20px;
`;

const ItemDescription = styled.p`
  font-size: 16px;
`;

const OrderSummaryContainer = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  width: 80%;
`;

const OrderSummaryTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const OrderSummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ProductImage = styled.img`
  width: 200px;
  height: 300px;
  object-fit: contain;
  margin-right: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  margin-left: 40px; /* Set margin-bottom to 0 */
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px; /* Adjust margin-bottom as needed */
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  margin-top: 100px;
`;

const Button1 = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 100px;
`;

const LeftSection = styled.div`
  flex: 7;
  padding-right: 20px;
  margin-left: 400px;
  border-right: 1px solid #ccc; /* Add border to create a vertical line */
`;

const RightSection = styled.div`
  flex: 3;
  padding-left: 20px;
  margin-right: 400px;
`;
const AddressBox = styled.div`
  display: flex;
  align-items: center; /* Align items vertically */
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
`;

const RadioLabel = styled.label`
  margin-right: 10px; /* Adjust margin as needed */
`;

const AddressContent = styled.div`
  flex: 1; /* Take remaining space */
  margin-top: 10px;
`;

const RadioInput = styled.input`
  margin-right: 10px;
  margin-bottom: 70px;
`;

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [selectedAddressId, setSelectedAddressId] = useState(null); // State to store the selected address ID
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const { cartItems } = useSelector((state) => state.userCart);
  const { userAddress } = useSelector((state) => state.userAddress);
  const [error, setError] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const user_id = Cookies.get("userID");
  const navigate = useNavigate();

  const defaultAddress = userAddress
    ? userAddress.find((address) => address.is_default)
    : null;
  const otherAddresses = userAddress
    ? userAddress.filter((address) => !address.is_default)
    : [];

  useEffect(() => {
    dispatch(fetchUserAddress(user_id));
  }, [dispatch, user_id]);

  const handlePlaceOrder = () => {
    setLoading(true);
    setError(null);

    const orderDetails = {
      items: cartItems.map((item) => ({
        product_id: item.product_id,
        product_quantity: item.product_quantity,
        product_size: item.product_size,
      })),
      shippingAddress,
      paymentMethod,
      user_id,
      products: cartItems,
    };

    dispatch(addUserOrders(orderDetails))
      .then(() => {
        navigate("/order-success");
      })
      .catch((error) => {
        setLoading(false);
        setError(
          error.message || "Failed to place order. Please try again later."
        );
      });
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product_price * item.product_quantity,
    0
  );
  const baseURL = "http://localhost:3001";

  const handleAddAddress = (formData) => {
    dispatch(addUserAddress(formData, user_id))
      .then(() => {
        setShowAddressModal(false);
      })
      .catch((error) => {
        console.error("Failed to add address:", error);
      });
  };

  const handleSelectAddress = (addressId) => {
    setSelectedAddressId(addressId);
  };

  const handleEditAddress = (addressId) => {
    // Logic to handle editing address
  };

  const handleRemoveAddress = (addressId) => {
    // Logic to handle removing address
  };

  return (
    <>
      <NavigationBarforcheckoutpage />
      <Container>
        <LeftSection>
          <Section>
            <TitleContainer>
              <SectionTitle>Select Address</SectionTitle>
              <Button1 onClick={() => setShowAddressModal(true)}>
                Add New Address
              </Button1>
            </TitleContainer>
            <ItemContainer>
              <h3>Default Address:</h3>
              {defaultAddress && (
                <AddressBox key={defaultAddress.id}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <RadioLabel>
                        <RadioInput
                          type="radio"
                          name="address"
                          id={defaultAddress.id}
                          checked={selectedAddressId === defaultAddress.id}
                          onChange={() =>
                            setSelectedAddressId(defaultAddress.id)
                          }
                        />
                      </RadioLabel>
                      <AddressContent>
                        <p>{defaultAddress.fullname}</p>
                        <p>{defaultAddress.address}</p>
                        <p>
                          {defaultAddress.city}, {defaultAddress.state},{" "}
                          {defaultAddress.zip}
                        </p>
                      </AddressContent>
                    </div>
                    <div>
                      <Button
                        onClick={() => handleEditAddress(defaultAddress.id)}
                        style={{ marginRight: "10px" }}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleRemoveAddress(defaultAddress.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </AddressBox>
              )}

              {otherAddresses.length > 0 && (
                <div>
                  <h3>Other Addresses:</h3>
                  {otherAddresses.map((address) => (
                    <AddressBox key={address.id}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <RadioLabel>
                            <RadioInput
                              type="radio"
                              name="address"
                              id={address.id}
                              checked={selectedAddressId === address.id}
                              onChange={() => setSelectedAddressId(address.id)} // Update selected address
                            />
                          </RadioLabel>
                          <AddressContent>
                            <p>{address.fullname}</p>
                            <p>{address.address}</p>
                            <p>
                              {address.city}, {address.state}, {address.zip}
                            </p>
                          </AddressContent>
                        </div>
                        {selectedAddressId === address.id && ( // Display buttons only if the address is selected
                          <div>
                            <Button
                              onClick={() => handleEditAddress(address.id)}
                              style={{ marginRight: "10px" }}
                            >
                              Edit
                            </Button>
                            <Button
                              onClick={() => handleRemoveAddress(address.id)}
                            >
                              Remove
                            </Button>
                          </div>
                        )}
                      </div>
                    </AddressBox>
                  ))}
                </div>
              )}
            </ItemContainer>
          </Section>
        </LeftSection>
        <RightSection>
          <Section>
            <SectionTitle>Review Items and Shipping</SectionTitle>
            <ItemContainer>
              {cartItems.map((item, index) => (
                <div key={index}>
                  <ProductImage
                    src={`${baseURL}${item.product_image_url}`}
                    alt={item.product_name}
                  />
                  <ItemDescription>Estimated delivery by:</ItemDescription>

                  <ItemDescription>
                    Price: ${item.product_price}
                  </ItemDescription>
                  <ItemDescription>
                    Quantity: {item.product_quantity}
                  </ItemDescription>
                  <ItemDescription>Size: {item.product_size}</ItemDescription>
                </div>
              ))}
            </ItemContainer>
          </Section>
          <Section>
            <SectionTitle>Order Summary</SectionTitle>
            <OrderSummaryContainer>
              <OrderSummaryItem>
                <span>Items:</span>
                <span>{cartItems.length}</span>
              </OrderSummaryItem>
              <OrderSummaryItem>
                <span>Total Price:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </OrderSummaryItem>
            </OrderSummaryContainer>
          </Section>
          <Form>
            <label htmlFor="paymentMethod">Payment Method:</label>
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">Select Payment Method</option>
              <option value="Credit/Debit Cards">Credit/Debit Cards</option>
              <option value="PayPal">PayPal</option>
              <option value="Digital Wallets">Digital Wallets</option>
              <option value="Bank Transfers">Bank Transfers</option>
              <option value="Cash on Delivery (COD)">
                Cash on Delivery (COD)
              </option>
              <option value="Cryptocurrency">Cryptocurrency</option>
              <option value="Buy Now, Pay Later">Buy Now, Pay Later</option>
              <option value="Electronic Checks (E-Checks)">
                Electronic Checks (E-Checks)
              </option>
              <option value="Mobile Payments">Mobile Payments</option>
              <option value="Gift Cards/Vouchers">Gift Cards/Vouchers</option>
            </select>
          </Form>
          <Button onClick={handlePlaceOrder} disabled={loading}>
            {loading ? "Placing Order..." : "Place Your Order"}
          </Button>
          {error && <p>Error: {error}</p>}
        </RightSection>
      </Container>
      <Modal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        onSubmit={handleAddAddress}
      />
    </>
  );
};

export default CheckoutPage;
