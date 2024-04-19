import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { addUserOrders } from "../store/actions/userOrdersActions";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import NavigationBarforcheckoutpage from "./Navigationbarforcheckout";
import Modal from "./ModalMessageForAddress";
import { addUserAddress } from "../store/actions/userAddressActions";
import {
  fetchUserAddress,
  updateUserAddress,
  deleteUserAddress,
} from "../store/actions/userAddressActions";
import { getCartByUserId } from "../store/actions/userCartActions";
import UpdateModal from "./ModalMessagToUpdateAddress";
import { deleteCartByUserId } from "../store/actions/userCartActions";
import { updateProductSizeAndColorQuantity } from "../store/actions/productQuantityActions";

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

const ItemDescription1 = styled.p`
  font-size: 18px;
  margin-left: -15px;
`;

const OrderSummaryContainer = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  width: 90%;
  box-shadow: 5px 10px 8px #888888;
`;

const OrderSummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 18px;
`;

const OrderSummaryItem1 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 17px;
  font-weight: bold;
`;

const ProductImage = styled.img`
  width: 150px;
  height: 200px;
  object-fit: contain;
  margin-left: -25px;
`;

const Form = styled.form`
  display: flex;
  font-size: 20px;
  width: 90%;
  flex-direction: column;
  margin-bottom: 40px;
  margin-top: 40px;
  textarea {
    box-shadow: 5px 10px 8px #888888;
    /* Add any other styles you want for the textarea */
  }

  select {
    box-shadow: 5px 10px 8px #888888;
    /* Add any other styles you want for the select element */
  }

  label {
    font-weight: bold; /* Make the label text bold */
    margin-bottom: 10px;
    font-size: 20px;
  }
`;

const Button = styled.button`
  background-color: #f04878;
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 40px; /* Set margin-bottom to 0 */
  box-shadow: 5px 10px 8px #888888;
`;

const Button2 = styled.button`
  background-color: #f04878;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  border: none;
  padding: 15px 80px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  margin-left: 100px; /* Set margin-bottom to 0 */
  margin-bottom: 200px;
  box-shadow: 5px 10px 8px #888888;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px; /* Adjust margin-bottom as needed */
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  margin-top: 20px;
`;

const SectionTitle1 = styled.h2`
  font-size: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const SectionTitle2 = styled.h2`
  font-size: 15px;
  margin-top: 30px;
  margin-bottom: 5px;
`;

const Button1 = styled.button`
  background-color: #f04878;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 100px;
  font-size: 15px;
  font-weight: bold;
  box-shadow: 5px 10px 8px #888888;
  margin-top: 10px;
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
  width: 900px;
  height: 350px;
  margin-bottom: 40px;
  box-shadow: 5px 10px 8px #888888;
  font-size: 20px;
`;

const AddressBox1 = styled.div`
  display: flex;
  align-items: center; /* Align items vertically */
  border: 1px solid #ccc;
  padding: 20px;
  width: 900px;
  margin-top: -10px;
  box-shadow: 5px 10px 8px #888888;
  font-size: 20px;
`;

const RadioLabel = styled.label`
  margin-right: 10px; /* Adjust margin as needed */
`;

const RadioLabel1 = styled.label`
  margin-left: 100px; /* Adjust margin as needed */
`;

const AddressContent = styled.div`
  flex: 1; /* Take remaining space */
  margin-top: 10px;
  font-size: 18px;
`;

const RadioInput = styled.input`
  margin-right: 15px;
  margin-bottom: 130px;
  transform: scale(1.5);
`;

const RadioInput1 = styled.input`
  margin-right: 15px;
  margin-bottom: 90px;
  transform: scale(1.5);
  &:checked {
    background-color: red; /* Set the background color to pink when checked */
  }
`;
const EditRemoveContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EditRemoveButtons = styled.div`
  margin-bottom: 80px;
`;

const EditRadioLabel1 = styled.div`
  margin-top: 50px;
  margin-left: -320px;
  margin-bottom: 10px;
`;

const EditRadioLabel2 = styled.div`
  margin-top: 50px;
  margin-left: -220px;
  margin-bottom: 10px;
`;

const CheckoutPage = () => {
  const dispatch = useDispatch();

  const [selectedAddressId, setSelectedAddressId] = useState(null); // State to store the selected address ID
  const [shippingAddressFull, setShippingAddressFull] = useState("");
  const [billingAddressFull, setBillingAddressFull] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const { cartItems } = useSelector((state) => state.userCart);
  const { userAddress } = useSelector((state) => state.userAddress);
  const [error, setError] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const user_id = Cookies.get("userID");
  const navigate = useNavigate();
  const [editAddressData, setEditAddressData] = useState(null); // State to hold the initial address data for editing
  const [showEditAddressModal, setShowEditAddressModal] = useState(false); // State to manage the visibility of the edit address modal
  const [orderNotes, setOrderNotes] = useState("");
  const defaultAddress = Array.isArray(userAddress)
    ? userAddress.find((address) => address.is_default)
    : null;
  const otherAddresses = Array.isArray(userAddress)
    ? userAddress.filter((address) => !address.is_default)
    : [];

  useEffect(() => {
    dispatch(fetchUserAddress(user_id));
  }, [dispatch, user_id]);

  const handlePlaceOrder = () => {
    if (!selectedAddressId) {
      alert("Please select a shipping address.");
      return;
    }

    // Payment method validation
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    // Billing address validation
    if (!billingAddressFull) {
      alert("Please select a billing address.");
      return;
    }
    setLoading(true);
    setError(null);

    const totalPrice = cartItems.reduce(
      (total, item) => total + item.product_price * item.product_quantity,
      0
    );
    const calculateTax = (totalPrice) => {
      // tax rate for Arizona (5.6%)
      const taxRate = 0.056;
      return totalPrice * taxRate;
    };
    const tax = calculateTax(totalPrice);
    const shippingFee = 10.0;
    const platformFee = 5.0;
    const totalAmount = totalPrice + shippingFee + platformFee + tax;

    const orderDetails = {
      items: cartItems.map((item) => ({
        product_id: item.product_id,
        product_quantity: item.product_quantity,
        product_size: item.product_size,
      })),
      shipping_address: shippingAddressFull,
      billing_address: billingAddressFull,
      paymentMethod,
      user_id,

      estimated_tax: tax.toFixed(2), // Add estimated tax to order details
      order_price: totalPrice.toFixed(2), // Add total price to order details
      total_order_price_with_tax: totalAmount.toFixed(2), // Add order price to order details
      status: "Pending", // Add status to order details
      order_payment_type: paymentMethod, // Add payment type to order details
      payment_status: "Paid", // Add payment status to order details
      delivery_status: "Ordered", // Add delivery status to order details
      order_notes: orderNotes, // Add order notes if needed
      products: cartItems,
    };

    dispatch(addUserOrders(orderDetails))
      .then(() => {
        if (cartItems.length > 0) {
          cartItems.forEach((item) => {
            dispatch(
              updateProductSizeAndColorQuantity(
                item.product_id,
                item.product_size,
                item.product_quantity
              )
            );
          });
          dispatch(deleteCartByUserId(user_id));
        }
        navigate("/order-success");
      })
      .catch((error) => {
        setLoading(false);
        setError(
          error.message || "Failed to place order. Please try again later."
        );
      });
  };

  useEffect(() => {
    if (user_id) {
      dispatch(getCartByUserId(user_id));
    }
  }, [dispatch, user_id]);

    const baseURL = "http://ec2-44-202-87-215.compute-1.amazonaws.com:3001";

  const handleAddAddress = (formData) => {
    dispatch(addUserAddress(formData, user_id))
      .then(() => {
        dispatch(fetchUserAddress(user_id));
        setShowAddressModal(false);
      })
      .catch((error) => {
        console.error("Failed to add address:", error);
      });
  };

  const handleSelectAddress = (addressId) => {
    setSelectedAddressId(addressId);

    const selectedAddress = userAddress.find(
      (address) => address.id === addressId
    );
    if (selectedAddress) {
      const fullAddress = `${selectedAddress.fullname}, ${selectedAddress.address}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.zip}`;
      setShippingAddressFull(fullAddress);
    }
  };
  const calculateEstimatedDelivery = () => {
    const today = new Date();
    const deliveryDate = new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000); // Add 5 days to today's date
    return deliveryDate.toLocaleDateString(); // Format the date as a string
  };
  const handleUseAsBilling = (addressId) => {
    const selectedAddress = userAddress.find(
      (address) => address.id === addressId
    );

    if (selectedAddress) {
      const fullBillingAddress = `${selectedAddress.fullname}, ${selectedAddress.address}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.zip}`;

      setBillingAddressFull(fullBillingAddress);
    }
  };
  const handleOpenEditModal = (addressData) => {
    setEditAddressData(addressData);
    setSelectedAddressId(addressData.id);
    setShowEditAddressModal(true);
  };

  const handleEditAddress = (addressId, updatedAddressData) => {
    dispatch(updateUserAddress(user_id, addressId, updatedAddressData)).then(
      () => {
        dispatch(fetchUserAddress(user_id));
        setShowEditAddressModal(false);
      }
    );
  };

  const handleRemoveAddress = (addressId) => {
    dispatch(deleteUserAddress(user_id, addressId)).then(() => {
      dispatch(fetchUserAddress(user_id));
      setShowAddressModal(false);
    });
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product_price * item.product_quantity,
    0
  );
  const calculateTax = (totalPrice) => {
    // tax rate for Arizona (5.6%)
    const taxRate = 0.056;
    return totalPrice * taxRate;
  };
  const tax = calculateTax(totalPrice);
  const shippingFee = 10.0;
  const platformFee = 5.0;
  const totalAmount = totalPrice + shippingFee + platformFee + tax;

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
              <SectionTitle1>DEFAULT ADDRESS</SectionTitle1>
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
                            handleSelectAddress(defaultAddress.id)
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
                        <p>{defaultAddress.mobilenumber}</p>
                      </AddressContent>
                    </div>
                    <EditRemoveContainer>
                      <EditRemoveButtons>
                        <Button
                          onClick={() => handleOpenEditModal(defaultAddress)} // Pass the default address data to the editing modal
                          style={{ marginRight: "10px" }}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleRemoveAddress(defaultAddress.id)}
                        >
                          Remove
                        </Button>
                      </EditRemoveButtons>
                      <div>
                        <EditRadioLabel1>
                          <RadioLabel1>
                            <input
                              type="checkbox"
                              onChange={() =>
                                handleUseAsBilling(defaultAddress.id)
                              } // Call handleUseAsBilling with the address ID
                            />
                            Use this address as billing address
                          </RadioLabel1>
                        </EditRadioLabel1>
                      </div>
                    </EditRemoveContainer>
                  </div>
                </AddressBox>
              )}

              <SectionTitle1>OTHER ADDRESS</SectionTitle1>
              {otherAddresses.length > 0 && (
                <div>
                  {otherAddresses.map((address) => (
                    <AddressBox1 key={address.id}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <RadioLabel>
                            <RadioInput1
                              type="radio"
                              name="address"
                              id={address.id}
                              checked={selectedAddressId === address.id}
                              onChange={() => handleSelectAddress(address.id)} // Call handleSelectAddress with the address ID
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
                        {selectedAddressId === address.id && (
                          <EditRemoveContainer>
                            <EditRemoveButtons>
                              <Button
                                onClick={() => handleOpenEditModal(address)} // Pass the address data to the editing modal
                                style={{ marginRight: "10px" }}
                              >
                                Edit
                              </Button>
                              <Button
                                onClick={() => handleRemoveAddress(address.id)}
                              >
                                Remove
                              </Button>
                            </EditRemoveButtons>
                            <div>
                              <EditRadioLabel2>
                                <RadioLabel>
                                  <input
                                    type="checkbox"
                                    onChange={() =>
                                      handleUseAsBilling(address.id)
                                    } // Call handleUseAsBilling with the address ID
                                  />
                                  Use this address as billing address
                                </RadioLabel>
                              </EditRadioLabel2>
                            </div>
                          </EditRemoveContainer>
                        )}
                      </div>
                    </AddressBox1>
                  ))}
                </div>
              )}
            </ItemContainer>
          </Section>
          <Modal
            isOpen={showEditAddressModal}
            onClose={() => setShowEditAddressModal(false)}
            onSubmit={(updatedAddressData) =>
              handleEditAddress(editAddressData.id, updatedAddressData)
            }
            initialData={editAddressData}
          />
        </LeftSection>
        <RightSection>
          <Section>
            <SectionTitle2>DELIVERY ESTIMATES</SectionTitle2>
            <ItemContainer>
              {cartItems.map((item, index) => (
                <div key={index}>
                  <ProductImage
                    src={`${baseURL}${item.product_image_url}`}
                    alt={item.product_name}
                  />
                  <ItemDescription1>
                    Estimated delivery by: {calculateEstimatedDelivery()}
                  </ItemDescription1>
                </div>
              ))}
            </ItemContainer>
          </Section>
          <Section>
            <SectionTitle>Order Summary</SectionTitle>
            <OrderSummaryContainer>
              <OrderSummaryItem1>
                PRICE DETAILS ({cartItems.length} Items)
              </OrderSummaryItem1>
              <OrderSummaryItem>
                <span>Total Price</span> ${totalPrice.toFixed(2)}
              </OrderSummaryItem>
              <OrderSummaryItem>
                <span>Shipping Fee</span> ${shippingFee.toFixed(2)}
              </OrderSummaryItem>
              <OrderSummaryItem>
                <span>Platform Fee</span> ${platformFee.toFixed(2)}
              </OrderSummaryItem>
              <OrderSummaryItem>
                <span>Estimated tax to be collected</span> ${tax.toFixed(2)}
              </OrderSummaryItem>
              <hr />
              <OrderSummaryItem>
                <span>Total Amount</span> ${totalAmount.toFixed(2)}
              </OrderSummaryItem>
            </OrderSummaryContainer>
          </Section>
          <Form>
            <label htmlFor="paymentMethod">Payment Method</label>
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
          <Form>
            <label htmlFor="orderNotes">Order Notes</label>
            <textarea
              id="orderNotes"
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              rows={4}
              cols={50}
              placeholder="Add any special notes or instructions for your order..."
            />
          </Form>
          <Button2 onClick={handlePlaceOrder} disabled={loading}>
            {loading ? "Placing Order..." : "Place Your Order"}
          </Button2>
          {error && <p>Error: {error}</p>}
        </RightSection>
      </Container>

      <Modal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        onSubmit={handleAddAddress}
      />

      <UpdateModal
        isOpen={showEditAddressModal}
        onClose={() => setShowEditAddressModal(false)}
        onSubmit={(updatedAddressData) =>
          handleEditAddress(editAddressData.id, updatedAddressData)
        }
        initialAddress={editAddressData} // Pass the editAddressData
      />
    </>
  );
};

export default CheckoutPage;
