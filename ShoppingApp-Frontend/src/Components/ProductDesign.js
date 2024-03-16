
import styled from "styled-components";

export const ProductImage = styled.img`
  width: 300px;
  height: 400px;
  object-fit: contain;
  margin-bottom: 15px;
  cursor: pointer; /* Add cursor pointer for better UX */
`;

export const ProductItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
  width: calc(20% - 20px); /* 20% width with 20px margin */
`;

export const ProductItemContent = styled.div`
  text-align: left;
  margin-left: 60px;
  padding: 10px;
`;

export const RatingText = styled.span`
  margin-right: 250px;
  text-align: left;
`;

export const StarIcon = styled.span`
  color: gold;
`;

export const Container = styled.div`
  padding-top: 50px; /* Adjusted padding top */
  display: flex;
  justify-content: space-between;
  margin-left: 100px;
`;

export const Container1 = styled.div`
  padding-top: 50px; /* Adjusted padding top */
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FilterContainer = styled.div`
  margin-right: 20px;
`;

export const SortByContainer = styled.div`
  margin-left: 1900px; /* Aligns to the right side */
  margin-top: 30px;
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
  margin-bottom: 1px;
`;

export const ProductName = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const ProductDescription = styled(Text)`
  font-size: 18px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  margin-bottom: 5px;
`;

export const ProductPrice = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;
