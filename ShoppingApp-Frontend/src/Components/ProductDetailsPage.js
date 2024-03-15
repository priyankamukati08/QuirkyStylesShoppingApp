import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../store/actions/productActions";
import styled from "styled-components";
import NavigationBar from "./NavigationBar";
import { addProductToUserCart } from "../store/actions/userCartActions";
import Cookies from "js-cookie"; // Import js-cookie library

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
  padding: 20px 150px;
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
  cursor: pointer;
  ${({ selected }) => selected && "color: hotpink; border-color: hotpink; "}
`;

const SizeText = styled.span`
  font-size: 20px;
`;

const BagIcon = styled.span`
  font-size: 24px;
  margin-right: 10px;
`;

const Badge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 5px;
`;

const Message = styled.div`
  background-color: #f04878;
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-top: 20px;
  font-weight: bold;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
`;

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { loading, product, error } = useSelector((state) => state.productbyid);
  const [selectedSize, setSelectedSize] = useState("");
  const [bagItemCount, setBagItemCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  // Get userID from cookies
  const userID = Cookies.get("userID");

  useEffect(() => {
    dispatch(getProductById(productId));
  }, [dispatch, productId]);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleAddToBag = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    dispatch(addProductToUserCart(userID, productId, 1, selectedSize))
      .then(() => {
        setBagItemCount(bagItemCount + 1);
        setSelectedSize("");
        setErrorMessage("Added to bag");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      })
      .catch((error) => {
        setErrorMessage("Failed to add product to bag");
      });
  };

  const handleAddToWishlist = () => {
    console.log("Product added to wishlist:", product);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !product) {
    return <div>Error: {error}</div>;
  }

  const sizes = ["S", "M", "L", "XL", "XXL"];

  const baseURL = "http://localhost:3001";

  return (
    <>
      <NavigationBar bagItemCount={bagItemCount}></NavigationBar>
      {errorMessage && <Message>{errorMessage}</Message>}
      <Container>
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
            <SizeOptions>
              {sizes.map((size) => (
                <Circle
                  key={size}
                  selected={size === selectedSize}
                  onClick={() => handleSizeChange(size)}
                >
                  <SizeText>{size}</SizeText>
                </Circle>
              ))}
            </SizeOptions>
          </SizeSelect>
          <div>
            <Button
              onClick={() => {
                if (!selectedSize) {
                  window.alert("Please select a size");
                } else {
                  handleAddToBag();
                }
              }}
            >
              <BagIcon>🛍️</BagIcon>Add to Cart
            </Button>

            <Button disabled={!selectedSize} onClick={handleAddToWishlist}>
              <BagIcon>🤍</BagIcon>Wishlist
            </Button>
          </div>
        </DetailsContainer>
      </Container>
    </>
  );
};

export default ProductDetailsPage;
