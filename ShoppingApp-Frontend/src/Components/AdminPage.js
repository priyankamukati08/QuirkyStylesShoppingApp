import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ProductManagement from "./ProductManagement";
import QuantityManagement from "./ProductQuantityManagement";
import NavigationBar from "./NavigationBar";

const DashboardHeading = styled.h1`
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  margin: 0 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: #0056b3;
  }
`;

const AdminPage = () => {
  const navigateToProductManagement = () => {
    window.location.href = "/ProductManagement";
  };

  const navigateToQuantityManagement = () => {
    window.location.href = "/ProductQuantityManagement";
  };

  return (
    <div>
      <NavigationBar />
      <DashboardHeading>Admin Dashboard</DashboardHeading>
      <ButtonContainer>
        <StyledButton onClick={navigateToProductManagement}>
          Product Management
        </StyledButton>
      </ButtonContainer>
    </div>
  );
};

export default AdminPage;
