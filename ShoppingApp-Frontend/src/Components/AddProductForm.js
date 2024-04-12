import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../store/actions/productActions";
import styled from "styled-components";

const AddProductForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    product_brand_name: "",
    product_description: "",
    product_category: "",
    product_price: "",
    product_image_url: "",
    sizes: {
      S: 0,
      M: 0,
      L: 0,
      XL: 0,
      XXL: 0,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQuantityChange = (size, quantity) => {
    setFormData({
      ...formData,
      sizes: {
        ...formData.sizes,
        [size]: quantity,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Concatenate sizes and quantities into the desired format
    const formattedSizes = Object.entries(formData.sizes)
      .map(([size, quantity]) => `${size}: ${quantity}`)
      .join(", ");

    // Create the final product data to be dispatched
    const productData = {
      ...formData,
      sizes: formattedSizes,
    };

    // Dispatch action to add product
    dispatch(addProduct(productData));

    // Clear form fields after submission
    setFormData({
      product_brand_name: "",
      product_description: "",
      product_category: "",
      product_price: "",
      product_image_url: "",
      sizes: {
        S: 0,
        M: 0,
        L: 0,
        XL: 0,
        XXL: 0,
      },
    });
  };

  return (
    <FormContainer>
      <FormTitle>Add New Product</FormTitle>
      <Form onSubmit={handleSubmit}>
        <FormField>
          <Label>Brand Name:</Label>
          <Input
            type="text"
            name="product_brand_name"
            value={formData.product_brand_name}
            onChange={handleChange}
            required
          />
        </FormField>
        <FormField>
          <Label>Description:</Label>
          <Textarea
            name="product_description"
            value={formData.product_description}
            onChange={handleChange}
            required
          />
        </FormField>
        <FormField>
          <Label>Category:</Label>
          <Input
            type="text"
            name="product_category"
            value={formData.product_category}
            onChange={handleChange}
            required
          />
        </FormField>
        <FormField>
          <Label>Price:</Label>
          <Input
            type="number"
            name="product_price"
            value={formData.product_price}
            onChange={handleChange}
            required
          />
        </FormField>
        <FormField>
          <Label>Image URL:</Label>
          <Input
            type="text"
            name="product_image_url"
            value={formData.product_image_url}
            onChange={handleChange}
            required
          />
        </FormField>
        {Object.entries(formData.sizes).map(([size, quantity]) => (
          <FormField key={size}>
            <Label>{size}:</Label>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(size, e.target.value)}
              required
            />
          </FormField>
        ))}
        <SubmitButton type="submit">Add Product</SubmitButton>
        
      </Form>
    </FormContainer>
  );
};

// Styled components for the form
const FormContainer = styled.div`
  margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  width: 1000px;
  margin: 0 auto; /* Align center */
`;

const FormTitle = styled.h3`
  text-align: center;
  margin-bottom: 60px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormField = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* Align items horizontally */
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-right: 10px;
  width: 150px; /* Adjust label width */
`;

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Textarea = styled.textarea`
  padding: 8px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const SubmitButton = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 50px;
  margin-bottom: 25px;
  width: 200px;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 5px 10px 8px #888888;
  font-size: 20px;

  &:hover {
    background-color: #45a049;
  }
`;

export default AddProductForm;
