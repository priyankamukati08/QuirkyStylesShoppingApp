import React, { useState } from "react";
import { styled } from "styled-components";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const BagContainer = styled.div`
  display: block;
  align-items: center;
  padding: 10px;
  width: 100px;
  margin-right: 30px;
  cursor: pointer;
  position: relative;
`;

const BagContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BagImage = styled.img`
  width: 60%;
  height: auto;
  margin: 0 auto;
`;

const BagText = styled.div`
  font-size: 14px;
  margin-top: 5px;
  font-weight: bold;
  text-align: center;
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

const BagItemsBar = () => {
  const navigate = useNavigate();
  const { bagItemCount } = useSelector((state) => state.userCart); // Assuming the bag item count is stored in the Redux state

  const handleBagClick = () => {
    navigate(`/userCart/:userId`);
  };

  return (
    <BagContainer onClick={handleBagClick}>
      <BagContent>
        <BagImage src="/bagiconimg.png"></BagImage>
        <BagText>Bag</BagText>
        {bagItemCount > 0 && <Badge>{bagItemCount}</Badge>}
      </BagContent>
    </BagContainer>
  );
};

export default BagItemsBar;
