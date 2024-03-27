import styled from "styled-components";
import React from "react";

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
  border-radius: 5px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalBody = styled.div`
  margin-bottom: 20px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CloseButton = styled.button`
  background-color: #ccc;
  color: #000;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
`;

const ProductImage = styled.img`
  width: 100px;
  height: 150px;
  object-fit: contain;
`;

const ProductDescription = styled.p`
  font-size: 16px;
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

const Modal = ({
  isOpen,
  onClose,
  product,
  onSizeChange,
  setSelectedSize,
  selectedSize,
}) => {
  if (!isOpen || !product) return null;

  const handleDone = () => {
    onClose();
    onSizeChange(selectedSize);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <CloseButton onClick={onClose}>Close</CloseButton>
        </ModalHeader>
        <ModalBody>
          <ProductImage src={product.image} alt={product.name} />
          <ProductDescription>{product.description}</ProductDescription>
          <SizeSelect>
            <SizeLabel>Select Size:</SizeLabel>
            <SizeOptions>
              {product.sizes.map((size) => (
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
        </ModalBody>
        <ModalFooter>
          <button onClick={handleDone}>Done</button>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
