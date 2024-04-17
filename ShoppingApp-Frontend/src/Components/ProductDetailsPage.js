import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { getProductById } from "../store/actions/productActions";
import styled, { css } from "styled-components";
import NavigationBar from "./NavigationBar";
import { addProductToUserCart } from "../store/actions/userCartActions";
import Cookies from "js-cookie";
import {
  addProductsToUserWishlist,
  fetchUserWishlist,
} from "../store/actions/userWishlistActions";
import { getCartByUserId } from "../store/actions/userCartActions";
import "react-toastify/dist/ReactToastify.css";
import CustomToast from "./ToastMessage";
import { getProductSizeAndColor } from "../store/actions/productQuantityActions";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const ProductImage = styled.img`
  width: 1000px;
  height: 1000px;
  object-fit: contain;
  margin-bottom: 20px;
`;

const DetailsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: -100px;
`;

const ProductTitle = styled.h2`
  font-size: 34px;
  margin-bottom: 10px;
`;

const ProductDescription = styled.p`
  font-size: 26px;
  margin-bottom: 20px;
`;

const ProductPrice = styled.p`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 20px;
`;

const StarIcon = styled.span`
  color: gold;
  margin-right: 5px;
`;

const Button = styled.button`
  padding: 20px 140px;
  background-color: #f04878;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 100px;
  margin-top: 60px;
  font-size: 20px;
  font-weight: bold;
  position: relative;
  box-shadow: 5px 10px 8px #888888;

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: #555555;
      cursor: not-allowed;
    `}
`;

const SizeSelect = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-top: 20px;
`;

const SizeLabel = styled.span`
  font-size: 20px;
  margin-bottom: 10px;
  align-items: left;
`;

const SizeOptions = styled.div`
  display: flex;
  justify-content: center;
  align-items: left;
`;

const Circle = styled.div`
  position: relative; /* Required for absolute positioning of the cross */
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border-color: black;
  border: 2px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  margin-left: 10px;
  margin-top: 10px;
  cursor: ${({ quantity }) => (quantity > 0 ? "pointer" : "not-allowed")};
  ${({ selected }) => selected && "color: hotpink; border-color: hotpink; "}
  ${({ quantity }) =>
    quantity === 0 &&
    css`
      cursor: not-allowed;
      opacity: 0.5; /* Reduce opacity for disabled circle */
      &:before,
      &:after {
        content: "";
        position: absolute;
        width: 2px;
        height: 100%;
        background-color: red;
      }
      &:before {
        transform: rotate(45deg); /* Diagonal cross line */
      }
      &:after {
        transform: rotate(-45deg); /* Diagonal cross line */
      }
    `}
`;

const SizeText = styled.span`
  font-size: 20px;
`;

const BagIcon1 = styled.span`
  font-size: 24px;
  margin-right: 15px;
`;

const Message = styled.div`
  background-color: #000; /* Black background color */
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
  position: absolute;
  top: calc(100% + 100px); /* Position it below the bag icon */
  left: 50%;
  transform: translateX(-50%) translateY(10px); /* Offset it downward */
  z-index: 10; /* Ensure it's above other content */
`;

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { loading, product, error } = useSelector((state) => state.productbyid);
  const {
    productSizeColor,
    loading: sizeColorLoading,
    error: sizeColorError,
  } = useSelector((state) => state.productQuantity);
  const [selectedSize, setSelectedSize] = useState("");
  const [bagItemCount, setBagItemCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const userID = Cookies.get("userID");
  const { wishlistItems } = useSelector((state) => state.userWishlist);
  const addProductsToUserWishlistState = useSelector(
    (state) => state.addProductsToUserWishlist
  );
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInUserCart, setIsInUserCart] = useState(false);
  const { cartItems } = useSelector((state) => state.userCart);
  const addProductToUserCartState = useSelector(
    (state) => state.addProductToUserCart
  );
  const [toastMessage, setToastMessage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [addedToBag, setAddedToBag] = useState(false);
  let navigate = useNavigate();

  const showToast = (message) => {
    setToastMessage(message); // Set the toast message
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  useEffect(() => {
    const parsedProductId = parseInt(productId, 10);
    dispatch(getProductById(parsedProductId));
    dispatch(fetchUserWishlist(userID));
    dispatch(getCartByUserId(userID));
  }, [dispatch, productId, userID]);

  useEffect(() => {
    if (addProductToUserCartState.addProductToUserCart) {
      dispatch(getCartByUserId(userID));
    }
  }, [addProductToUserCartState, dispatch, userID]);

  useEffect(() => {
    dispatch(getProductById(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    dispatch(getProductSizeAndColor(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (addProductsToUserWishlistState.addProductsToUserWishlist) {
      dispatch(fetchUserWishlist(userID));
    }
  }, [addProductsToUserWishlistState, dispatch, userID]);

  useEffect(() => {
    const isInWishlist = wishlistItems.some(
      (item) => String(item.product_id) === productId
    );
    setIsInWishlist(isInWishlist);
  }, [wishlistItems, productId]);

  const handleGoToBag = () => {
    navigate("/usercart");
  };

  useEffect(() => {
    const isInUserCart = cartItems.some(
      (item) =>
        String(item.product_id) === productId &&
        item.product_size === selectedSize
    );
    setIsInUserCart(isInUserCart);
  }, [cartItems, productId, selectedSize]);

  useEffect(() => {
    setAddedToBag(false);
  }, [selectedSize]);

  const handleAddToBag = useCallback(() => {
    const existingProductIndex = cartItems.findIndex(
      (item) =>
        item.product_id === parseInt(productId, 10) &&
        item.product_size === selectedSize
    );

    if (existingProductIndex !== -1) {
      // Product with the same ID and size exists in the cart
      const updatedCart = [...cartItems];
      const existingProduct = updatedCart[existingProductIndex];

      // Create a new object with updated quantity
      const updatedProduct = {
        ...existingProduct,
        product_quantity: parseInt(existingProduct.product_quantity) + 1,
      };

      // Update the cart with the updated product
      updatedCart[existingProductIndex] = updatedProduct;

      dispatch(
        addProductToUserCart(
          updatedProduct.user_id,
          updatedProduct.product_id,
          updatedProduct.product_quantity,
          updatedProduct.product_size,
          updatedProduct.Product_Description
        )
      ).then(() => {
        dispatch(getProductById(productId));
      });

      showToast(
        "You have this item in your bag and we have increased the quantity by 1"
      );
    } else {
      // Product not found in cart, add it as a new item with quantity 1
      dispatch(addProductToUserCart(userID, productId, 1, selectedSize))
        .then(() => {
          dispatch(getCartByUserId(userID));
          setBagItemCount(bagItemCount + 1);
          showToast("Added to bag");
          setIsInUserCart(true);
        })
        .catch((error) => {
          setErrorMessage("Failed to add product to bag");
        });
    }
    setAddedToBag(true);
  }, [
    cartItems,
    selectedSize,
    userID,
    productId,
    bagItemCount,
    dispatch,
    showToast,
  ]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleAddToWishlist = useCallback(() => {
    const isInWishlist = wishlistItems.some(
      (item) => String(item.product_id) === productId
    );

    setIsInWishlist(isInWishlist);

    if (isInWishlist) {
      setErrorMessage("Product is already in the wishlist");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }
    dispatch(addProductsToUserWishlist(userID, productId))
      .then(() => {
        setErrorMessage("Added to wishlist");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      })
      .catch((error) => {
        console.error("Failed to add product to wishlist:", error);
        setErrorMessage("Failed to add product to wishlist");
      });
  }, [wishlistItems, userID, productId, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !product) {
    return <div>Error: {error}</div>;
  }

  const BagIcon = ({ icon }) => (
    <span style={{ margin: "10px" }}> {icon} </span>
  );

  const sizes = ["S", "M", "L", "XL", "XXL"]; // Hardcoded sizes

    const baseURL = "http://ec2-18-206-126-242.compute-1.amazonaws.com:3001";

  return (
    <>
      <NavigationBar bagItemCount={bagItemCount}></NavigationBar>
      {errorMessage && <Message>{errorMessage}</Message>}
      <Container>
        <CustomToast
          message={toastMessage}
          productImage={
            toastMessage === "Added to bag"
              ? `${baseURL}${product.product_image_url}`
              : null
          }
        />
        <ImageContainer>
          <ProductImage
            src={`${baseURL}${product.product_image_url}`}
            alt={product.product_name}
          />
        </ImageContainer>
        <DetailsContainer>
          <ProductTitle>
            {product.product_brand_name} {product.product_name}
          </ProductTitle>
          <ProductDescription>{product.product_description}</ProductDescription>
          <RatingContainer>
            <span>{product.product_rating}</span>
            <StarIcon>&#9733;</StarIcon>
          </RatingContainer>
          <ProductPrice>Price: ${product.product_price}</ProductPrice>

          <SizeSelect>
            <SizeLabel>Select Size:</SizeLabel>
            {sizeColorLoading ? (
              <div>Loading...</div>
            ) : (
              <SizeOptions>
                {sizes.map((size) => (
                  <div key={size}>
                    <Circle
                      selected={size === selectedSize}
                      onClick={() => handleSizeChange(size)}
                      quantity={
                        (productSizeColor && productSizeColor[size]) || 0
                      }
                      disabled={
                        (productSizeColor && productSizeColor[size]) === 0
                      }
                    >
                      <SizeText>{size}</SizeText>
                    </Circle>
                    {(productSizeColor && productSizeColor[size]) >= 1 &&
                      (productSizeColor && productSizeColor[size]) <= 5 && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                          }}
                        >
                          <div style={{ marginBottom: "5px" }}>
                            {/* Render the circle here */}
                          </div>
                          <span style={{ color: "red" }}>
                            {productSizeColor && productSizeColor[size]} left
                          </span>
                        </div>
                      )}
                  </div>
                ))}
              </SizeOptions>
            )}
          </SizeSelect>
          <div>
            <Button
              onClick={() => {
                console.log("Add to bag button clicked");
                if (!selectedSize) {
                  window.alert("Please select a size");
                } else {
                  if (addedToBag) {
                    handleGoToBag();
                  } else {
                    handleAddToBag();
                  }
                }
              }}
              disabled={productSizeColor[selectedSize] === 0}
            >
              <BagIcon1>🛍️</BagIcon1>
              {addedToBag ? "Go to Bag →" : "Add to Cart"}
            </Button>

            <Button onClick={handleAddToWishlist} disabled={isInWishlist}>
              <BagIcon icon={isInWishlist ? "❤️" : "🤍"} />
              {isInWishlist ? "Wishlisted" : "Wishlist"}
            </Button>
          </div>
        </DetailsContainer>
      </Container>
    </>
  );
};

export default ProductDetailsPage;
