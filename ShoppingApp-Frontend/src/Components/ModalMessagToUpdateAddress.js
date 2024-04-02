import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 600px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  background-color: #ccc;
  color: #000;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const ModalBody = styled.div`
  margin-bottom: 20px;
  text-align: left;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  text-align: left;
  width: 100%;
`;

const Button = styled.button`
  background-color: #f04878;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
`;

const HeadingWithLine = styled.div`
  display: flex;
  align-items: center;
`;

const HeadingText = styled.h2`
  margin-right: 10px;
`;

const HeadingText1 = styled.h2`
  margin-right: 10px;
  font-size: 20px;
`;

const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const RadioLabel = styled.label`
  margin-right: 10px;
  font-size: 16px;
`;

const RadioInput = styled.input`
  margin-right: 5px;
`;

const CheckboxLabel = styled.label`
  margin-left: 5px;
  font-size: 18px;
`;

// In UpdateModal component

// Change the prop name from initialData to initialAddress
const UpdateModal = ({ isOpen, onClose, onSubmit, initialAddress }) => {
  const [formData, setFormData] = useState(
    initialAddress || {
      fullname: "",
      mobilenumber: "",
      address: "",
      localitytown: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      is_default: false,
      addresstype: "",
    }
  );

  useEffect(() => {
    if (initialAddress) {
      setFormData(initialAddress);
    }
  }, [initialAddress]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <HeadingWithLine>
            <HeadingText>Edit Address</HeadingText>
          </HeadingWithLine>
          <CloseButton onClick={onClose}>Close</CloseButton>
        </ModalHeader>
        <hr />
        <ModalBody>
          <HeadingWithLine>
            <HeadingText1>Contact Details</HeadingText1>
          </HeadingWithLine>
          <hr />
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Name*"
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                name="mobilenumber"
                value={formData.mobilenumber}
                onChange={handleChange}
                placeholder="Mobile No*"
              />
            </FormGroup>
            <HeadingWithLine>
              <HeadingText1>Address</HeadingText1>
            </HeadingWithLine>
            <FormGroup>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address(House No, Building, Street, Area)*"
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                name="localitytown"
                value={formData.localitytown}
                onChange={handleChange}
                placeholder="Locality/Town*"
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City*"
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State*"
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                placeholder="Zip Code*"
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country*"
              />
            </FormGroup>
            <HeadingWithLine>
              <HeadingText1>Save Address as</HeadingText1>
            </HeadingWithLine>
            <RadioGroup>
              <RadioLabel>
                Home
                <RadioInput
                  type="radio"
                  name="addresstype"
                  value="Home"
                  checked={formData.addresstype === "Home"}
                  onChange={handleChange}
                />
              </RadioLabel>
              <RadioLabel>
                Work
                <RadioInput
                  type="radio"
                  name="addresstype"
                  value="Work"
                  checked={formData.addresstype === "Work"}
                  onChange={handleChange}
                />
              </RadioLabel>
            </RadioGroup>
            <CheckboxLabel>
              <input
                type="checkbox"
                name="is_default"
                checked={formData.is_default}
                onChange={handleChange}
              />
              Make this my default address
            </CheckboxLabel>
            <Button type="submit">Update Address</Button>
          </Form>
        </ModalBody>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default UpdateModal;
