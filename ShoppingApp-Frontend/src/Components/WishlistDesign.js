import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const WishlistHeading = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;


export const WishlistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr); /* Display six items in one row */
  gap: 40px; /* Set the gap between grid items */
  margin-top: 30px;
  margin-left: 80px;
  margin-right: 80px;
`;

export const WishlistItem = styled.div`
  position: relative; /* Make the container for the product item relative */
  border: 1px solid #ccc;
`;

export const RemoveIcon = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 22px; /* Adjust the size of the icon */
  color: red;
  cursor: pointer;
  border-radius: 50%; /* Make it circular */
  background-color: rgba(
    255,
    255,
    255,
    0.8
  ); /* Add background color to the circle */
  width: 30px; /* Set the width and height to create a circular shape */
  height: 30px; /* Set the width and height to create a circular shape */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1; /* Ensure it's above the product image */
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 550px; /* Set a fixed height */
  object-fit: cover; /* Ensure the entire image is visible within the fixed dimensions */
  border: 1px solid #ccc; /* Add border */
`;

export const ProductInfo = styled.div`
  padding: 10px;
`;

export const ProductTitle = styled.h3`
  font-size: 16px;
`;

export const ProductDescription = styled.p`
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  margin-bottom: 5px;
`;

export const ProductPrice = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: bold;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

export const Button = styled.button`
  padding: 5px 10px;
  background-color: ${({ backgroundColor }) => backgroundColor || "white"};
  color: ${({ color }) => color || "#f04878"};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex; /* Add display flex */
  align-items: center; /* Align items to the center */
  justify-content: center; /* Align content to the center */
  margin-left: 70px;
  font-weight: bold;
  text-transform: uppercase; /* Convert text to uppercase */
`;
export const ShoppingCartHeadingWhenEmpty = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  margin-left: 950px;
`;
export const ShoppingCartHeadingWhenEmpty1 = styled.h1`
  font-size: 26px;
  margin-top: 50px;
  margin-left: 750px;
  color: #e60026;
`;
