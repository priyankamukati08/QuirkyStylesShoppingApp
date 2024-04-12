import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/actions/productActions";
import {
  getAllProductSizesAndQuantities,
  updateProductSizeAndColorQuantityByAdmin,
} from "../store/actions/productQuantityActions";
import { updateProduct } from "../store/actions/productActions";
import styled from "styled-components";
import AddProductForm from "./AddProductForm";

const ProductManagement = () => {
  const dispatch = useDispatch();

  // Fetch loading states for products and productSizeColor
  const { products } = useSelector((state) => state.products);
  const { allProductSizeQuantity } = useSelector(
    (state) => state.ProductSizeQuantity
  );

  // Define state variables to store edited description and price for each product
  const [editedDescriptions, setEditedDescriptions] = useState({});
  const [editedPrices, setEditedPrices] = useState({});

  const [editingCell, setEditingCell] = useState(null);
  const [updatedQuantityMap, setUpdatedQuantityMap] = useState({});
  const [showAddProductForm, setShowAddProductForm] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getAllProductSizesAndQuantities());

    // Initialize updatedQuantityMap with existing quantities
    const initialUpdatedQuantityMap = {};
    for (const productId in allProductSizeQuantity) {
      const sizesAndQuantities = allProductSizeQuantity[productId];
      if (Array.isArray(sizesAndQuantities)) {
        sizesAndQuantities.forEach((sizeAndQuantity) => {
          initialUpdatedQuantityMap[`${productId}-${sizeAndQuantity.size}`] =
            sizeAndQuantity.quantity;
        });
      }
    }
    setUpdatedQuantityMap(initialUpdatedQuantityMap);
  }, [dispatch, allProductSizeQuantity]);

  const handleDeleteProduct = (productId) => {
    // Clear edited description and price for the deleted product
    setEditedDescriptions((prevDescriptions) => {
      const newDescriptions = { ...prevDescriptions };
      delete newDescriptions[productId];
      return newDescriptions;
    });
    setEditedPrices((prevPrices) => {
      const newPrices = { ...prevPrices };
      delete newPrices[productId];
      return newPrices;
    });

    console.log("Deleting product with ID:", productId);
  };

  const handleAddProduct = () => {
    console.log("Adding new product");
  };

  const handleCellEdit = (productId, size, columnName) => {
    setEditingCell({ productId, size, columnName });
  };

  const handlePriceChange = (productId, price) => {
    setEditedPrices((prevPrices) => ({
      ...prevPrices,
      [productId]: price,
    }));

    const currentProduct = products.find((product) => product.id === productId);

    if (editedDescriptions[productId] !== currentProduct.product_description) {
      setEditedDescriptions((prevDescriptions) => ({
        ...prevDescriptions,
        [productId]: currentProduct.product_description,
      }));
    }
  };

  const handleDescriptionChange = (productId, description) => {
    setEditedDescriptions((prevDescriptions) => ({
      ...prevDescriptions,
      [productId]: description,
    }));

    const currentProduct = products.find((product) => product.id === productId);

    if (editedPrices[productId] !== currentProduct.product_price) {
      setEditedPrices((prevPrices) => ({
        ...prevPrices,
        [productId]: currentProduct.product_price,
      }));
    }
  };

  const handleUpdateDescriptionAndPrice = (productId) => {
    const updatedFields = {};

    if (editedDescriptions[productId] !== undefined) {
      updatedFields.product_description = editedDescriptions[productId];
    }

    if (editedPrices[productId] !== undefined) {
      updatedFields.product_price = editedPrices[productId];
    }

    if (Object.keys(updatedFields).length > 0) {
      dispatch(updateProduct(productId, updatedFields));
    }

    setEditedDescriptions((prevDescriptions) => {
      const newDescriptions = { ...prevDescriptions };
      delete newDescriptions[productId];
      return newDescriptions;
    });
    setEditedPrices((prevPrices) => {
      const newPrices = { ...prevPrices };
      delete newPrices[productId];
      return newPrices;
    });
  };

  const handleQuantityChange = async (productId, size, action) => {
    const currentQuantity =
      updatedQuantityMap[`${productId}-${size}`] !== undefined
        ? updatedQuantityMap[`${productId}-${size}`]
        : allProductSizeQuantity[productId]?.[size]?.quantity || 0;

    let updatedQuantity;
    if (action === "increment") {
      updatedQuantity = currentQuantity + 1;
    } else if (action === "decrement") {
      updatedQuantity = currentQuantity > 0 ? currentQuantity - 1 : 0;
    }

    // Dispatch action to update product quantity
    await dispatch(
      updateProductSizeAndColorQuantityByAdmin(productId, size, updatedQuantity)
    );

    // Fetch updated product data
    await dispatch(getAllProductSizesAndQuantities());

    // Update component state with new quantity
    setUpdatedQuantityMap((prevUpdatedQuantityMap) => ({
      ...prevUpdatedQuantityMap,
      [`${productId}-${size}`]: updatedQuantity,
    }));
  };

  const toggleAddProductForm = () => {
    setShowAddProductForm(!showAddProductForm);
  };

  const renderSizeAndQuantity = (
    productId,
    allProductSizeQuantity,
    product
  ) => {
    const sizesAndQuantities = allProductSizeQuantity[productId];
    if (!Array.isArray(sizesAndQuantities)) return null;

    return sizesAndQuantities.map((sizeAndQuantity) => (
      <TableRow key={sizeAndQuantity.size}>
        <TableCell>{productId}</TableCell>
        <TableCell>{product.product_brand_name}</TableCell>
        <TableCell>
          {editingCell &&
          editingCell.productId === productId &&
          editingCell.columnName === "description" ? (
            <input
              type="text"
              value={
                editedDescriptions[productId] !== undefined
                  ? editedDescriptions[productId]
                  : product.product_description
              }
              onChange={(e) =>
                handleDescriptionChange(productId, e.target.value)
              }
              onBlur={() => setEditingCell(null)}
            />
          ) : (
            <span
              onClick={() =>
                setEditingCell({ productId, columnName: "description" })
              }
            >
              {editedDescriptions[productId] !== undefined
                ? editedDescriptions[productId]
                : product.product_description}
            </span>
          )}
        </TableCell>
        <TableCell>
          <ProductImage
            src={`${baseURL}${product.product_image_url}`}
            alt={product.product_brand_name}
          />
        </TableCell>
        <TableCell>
          {editingCell &&
          editingCell.productId === productId &&
          editingCell.columnName === "price" ? (
            <input
              type="number"
              value={
                editedPrices[productId] !== undefined
                  ? editedPrices[productId]
                  : product.product_price
              }
              onChange={(e) => handlePriceChange(productId, e.target.value)}
              onBlur={() => setEditingCell(null)}
            />
          ) : (
            <span
              onClick={() => setEditingCell({ productId, columnName: "price" })}
            >
              {editedPrices[productId] !== undefined
                ? editedPrices[productId]
                : product.product_price}
            </span>
          )}
        </TableCell>
        <TableCell>{sizeAndQuantity.size}</TableCell>
        <TableCell>
          {editingCell &&
          editingCell.productId === productId &&
          editingCell.size === sizeAndQuantity.size &&
          editingCell.columnName === "quantity" ? (
            <QuantityWrapper>
              <Button
                onClick={() =>
                  handleQuantityChange(
                    productId,
                    sizeAndQuantity.size,
                    "decrement"
                  )
                }
              >
                -
              </Button>
              <QuantitySpan>
                {updatedQuantityMap[`${productId}-${sizeAndQuantity.size}`]}
              </QuantitySpan>
              <Button
                onClick={() =>
                  handleQuantityChange(
                    productId,
                    sizeAndQuantity.size,
                    "increment"
                  )
                }
              >
                +
              </Button>
            </QuantityWrapper>
          ) : (
            <span
              onClick={() =>
                handleCellEdit(productId, sizeAndQuantity.size, "quantity")
              }
            >
              {sizeAndQuantity.quantity}
            </span>
          )}
        </TableCell>
        <TableCell>
          <Button
            onClick={() => {
              const productSize = allProductSizeQuantity[productId];
              const quantity =
                productSize && productSize[sizeAndQuantity.size]
                  ? productSize[sizeAndQuantity.size].quantity
                  : 0;

              // Check if there's an updated quantity in updatedQuantityMap
              const updatedQuantity =
                updatedQuantityMap[`${productId}-${sizeAndQuantity.size}`] !==
                undefined
                  ? updatedQuantityMap[`${productId}-${sizeAndQuantity.size}`]
                  : quantity; // If not, use the current quantity from the state

              // Dispatch action to update the product quantity
              dispatch(
                updateProductSizeAndColorQuantityByAdmin(
                  productId,
                  sizeAndQuantity.size,
                  updatedQuantity
                )
              ).then(() => {
                dispatch(getAllProductSizesAndQuantities());
                // Update the local state with the new quantity
                setUpdatedQuantityMap((prevUpdatedQuantityMap) => ({
                  ...prevUpdatedQuantityMap,
                  [`${productId}-${sizeAndQuantity.size}`]: updatedQuantity,
                }));
              });

              // Clear the editingCell state to hide the + and - buttons
              setEditingCell(null);
            }}
          >
            Update
          </Button>
        </TableCell>
        <TableCell>
          <Button onClick={() => handleDeleteProduct(productId)}>Delete</Button>
        </TableCell>
      </TableRow>
    ));
  };

  const baseURL = "http://localhost:3001";

  return (
    <Container>
      <Heading>Inventory Store</Heading>
      {showAddProductForm && <AddProductForm />}
      <AddProductButton onClick={toggleAddProductForm}>
        {showAddProductForm ? "Cancel" : "Add New Product"}
      </AddProductButton>
      <StyledTable>
        <thead>
          <TableRow>
            <TableHeader>Product ID</TableHeader>
            <TableHeader>Product Brand Name</TableHeader>
            <TableHeader>Product Description</TableHeader>
            <TableHeader>Product Image</TableHeader>
            <TableHeader>Product Price (in $)</TableHeader>
            <TableHeader>Size</TableHeader>
            <TableHeader>Quantity</TableHeader>
            <TableHeader>Action</TableHeader>
            <TableHeader>Action</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {products
            .slice() // Make a copy of the array to avoid mutating the original array
            .sort((a, b) => a.id - b.id) // Sort the products based on their IDs
            .map((product) => (
              <React.Fragment key={product.id}>
                {renderSizeAndQuantity(
                  product.id,
                  allProductSizeQuantity,
                  product
                )}
              </React.Fragment>
            ))}
        </tbody>
      </StyledTable>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableHeader = styled.th`
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
`;

const AddProductButton = styled.button`
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
  margin-bottom: 60px;
  margin-top: 30px;

  &:hover {
    background-color: #45a049;
  }
`;

const Button = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin: 0 5px;

  &:hover {
    background-color: #45a049;
  }
`;

const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const QuantitySpan = styled.span`
  margin: 0 10px;
`;

const Heading = styled.h2`
  margin-top: 50px;
  text-align: center;
`;

export default ProductManagement;
