import React from "react";
import styled from "styled-components";

const SizeColorQuantity = ({
  sizes,
  colors,
  quantities,
  selectedSize,
  selectedColor,
  onSizeChange,
}) => {
  const handleSizeClick = (size) => {
    if (quantities[size] > 0) {
      onSizeChange(size);
    }
  };

  return (
    <Container>
      <SizeContainer>
        <SizeLabel>Sizes:</SizeLabel>
        <SizeOptions>
          {sizes.map((size) => (
            <Circle
              key={size}
              disabled={quantities[size] === 0}
              selected={size === selectedSize}
              onClick={() => handleSizeClick(size)}
            >
              {size}
              {quantities[size] === 0 && <CrossIcon>&#10005;</CrossIcon>}
            </Circle>
          ))}
        </SizeOptions>
      </SizeContainer>
      <ColorContainer>
        <ColorLabel>Colors:</ColorLabel>
        <ColorOptions>
          {colors.map((color) => (
            <Color key={color} selected={color === selectedColor}>
              {color}
            </Color>
          ))}
        </ColorOptions>
      </ColorContainer>
      <QuantityContainer>
        <QuantityLabel>Quantity:</QuantityLabel>
        <QuantityInput
          type="number"
          min="1"
          value={quantities[selectedSize]}
          readOnly
        />
        {quantities[selectedSize] < 5 && (
          <Message>{quantities[selectedSize]} items left</Message>
        )}
      </QuantityContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const SizeContainer = styled.div`
  margin-bottom: 10px;
`;

const ColorContainer = styled.div`
  margin-bottom: 10px;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SizeLabel = styled.span`
  font-size: 18px;
`;

const ColorLabel = styled.span`
  font-size: 18px;
`;

const QuantityLabel = styled.span`
  font-size: 18px;
  margin-right: 10px;
`;

const SizeOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ColorOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Circle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  ${({ selected }) => selected && "color: hotpink; border-color: hotpink;"}
  ${({ disabled }) => disabled && "opacity: 0.5; pointer-events: none;"}
`;

const Color = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${({ selected }) => (selected ? "hotpink" : "transparent")};
  border: 2px solid black;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const QuantityInput = styled.input`
  width: 50px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
`;

const Message = styled.span`
  font-size: 14px;
  color: red;
`;

const CrossIcon = styled.span`
  font-size: 16px;
  margin-left: 5px;
`;

export default SizeColorQuantity;
