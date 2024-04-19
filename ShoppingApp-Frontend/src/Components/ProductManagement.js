import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/actions/productActions";
import {
  getAllProductSizesAndQuantities,
  updateProductSizeAndColorQuantityByAdmin,
} from "../store/actions/productQuantityActions";
import { updateProduct } from "../store/actions/productActions";
import styled from "styled-components";
import AddProductForm from "./AddProductForm";
import { fetchUserInfo } from "../store/actions/userInfoActions";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";

const ProductManagement = () => {
  const { products } = useSelector((state) => state.products);
  const { allProductSizeQuantity } = useSelector(
    (state) => state.ProductSizeQuantity
  );

  const [editedDescriptions, setEditedDescriptions] = useState({});
  const [editedPrices, setEditedPrices] = useState({});
  const [editingCell, setEditingCell] = useState(null);
  const [updatedQuantityMap, setUpdatedQuantityMap] = useState({});
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const userInfo = useSelector((state) => state.userInfoDetail.userInfoDetails);
  const dispatch = useDispatch();
  const user_id = Cookies.get("userID");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        const response = await dispatch(fetchUserInfo(user_id));
        console.log("User information:", response);
      } catch (error) {
        console.error("Error fetching user information:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInformation();
  }, [dispatch, user_id]);

 useEffect(() => {
   if (!loading) {
     if (userInfo) {
       const { user_type } = userInfo;
       console.log("User type:", user_type);
       if (user_type === "admin") {
         setIsAdmin(true);
       } else {
         navigate("/homepage");
       }
     } else {
       navigate("/homepage");
     }
   }
 }, [userInfo, loading, navigate]);

  const handleQuantityChange = useCallback(
    async (productId, size, action) => {
      try {
        console.log("Updating quantity:", productId, size, action);

        setUpdatedQuantityMap((prevUpdatedQuantityMap) => {
          const key = `${productId}-${size}`;
          const currentQuantity = prevUpdatedQuantityMap[key] || 0;
          const updatedQuantity =
            action === "increment" ? currentQuantity + 1 : currentQuantity - 1;

          const newQuantityMap = {
            ...prevUpdatedQuantityMap,
            [key]: updatedQuantity >= 0 ? updatedQuantity : 0,
          };

          dispatch(
            updateProductSizeAndColorQuantityByAdmin(
              productId,
              size,
              updatedQuantity
            )
          )
            .then(() => {
              // After updating the product quantity, dispatch a separate action
              dispatch(getAllProductSizesAndQuantities());
            })
            .catch((error) => {
              console.error("Error updating product quantity:", error);
            });

          return newQuantityMap;
        });
      } catch (error) {
        console.error("Error updating product quantity:", error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getAllProductSizesAndQuantities());
  }, [dispatch]);

  useEffect(() => {
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
      dispatch(updateProduct(productId, updatedFields))
        .then(() => {
          alert("Changes have been updated successfully"); // Alert message
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
        })
        .catch((error) => {
          console.error("Error updating product:", error);
          // Handle error if necessary
        });
    }
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
              alert("Changes have been updated successfully!");

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
      </TableRow>
    ));
  };

    const baseURL = "http://ec2-44-202-87-215.compute-1.amazonaws.com:3001";

  return (
    <>
      <NavigationBar />

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
    </>
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
const CancelButton = styled.button`
  background-color: #f44336;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #d32f2f;
  }
`;

export default ProductManagement;
