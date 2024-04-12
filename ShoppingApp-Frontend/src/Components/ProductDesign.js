import styled from "styled-components";

export const ProductImage = styled.img`
  width: 300px; /* Set a fixed width for all images */
  height: 400px; /* Set a fixed height for all images */
  object-fit: contain;
  cursor: pointer; /* Add cursor pointer for better UX */
`;

export const Container = styled.div`
  padding-top: 50px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-left: 100px;
  margin-top: 100px; /* Adjusted margin top to create space below the fixed container */
`;

export const ProductItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  width: 300px; /* Adjust width to accommodate image width and text */
  margin-right: 10px; /* Add margin to create space between product items */
`;

export const ProductItemContent = styled.div`
  text-align: left;
  margin-top: 15px; /* Add margin between image and text */
`;

export const RatingText = styled.span`
  text-align: left;
  margin-left: 22px;
`;

export const StarIcon = styled.span`
  color: gold;
`;

export const LeftSection = styled.div`
  flex: 0 0 200px; /* Set fixed width for the left section */
  margin-right: 20px;
  border-right: 1px solid #ccc; /* Add vertical line */
  padding-right: 20px; /* Add some padding to the right of the vertical line */
  margin-top: -150px;
`;

export const RightSection = styled.div`
  flex: 1; /* Take remaining space */
  margin-left: 30px;
  margin-right: 50px;
`;

export const SortByContainer = styled.div`
  position: absolute;
  top: 170px; /* Adjust this value to set the vertical position */
  right: 50px; /* Adjust this value to set the horizontal position */
  z-index: 100; /* Ensure the z-index is higher than other elements */
`;

export const FilterTitle = styled.h3`
  margin-bottom: 10px;
`;

export const CheckboxLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`;

export const ColorCheckbox = styled.input`
  display: none;

  &:checked + span {
    background-color: ${(props) => props.color};
    border: 1px solid #000;
  }
`;

export const ColorIndicator = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #ccc;
  margin-right: 5px;
`;

export const Text = styled.div`
  margin-bottom: 5px;
  margin-left: 20px;
`;

export const ProductName = styled(Text)`
  font-size: 20px;
  font-weight: bold;
`;

export const ProductDescription = styled(Text)`
  font-size: 18px;
  margin-bottom: 10px; /* Adjusted margin */
`;

export const ProductPrice = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px; /* Adjusted margin */
`;

export const FilterContainer = styled.div`
  margin-right: 20px;
  margin-top: 200px;
`;

export const ShadeEffect = styled.div`
  background-color: #f8f9f9; /* Base background color */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Box shadow for the shade effect */
`;
