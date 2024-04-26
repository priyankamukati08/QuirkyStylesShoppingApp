import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserInfo } from "../store/actions/userInfoActions";
import Cookies from "js-cookie";
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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user information:", error);
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

  const navigateToProductManagement = () => {
    navigate("/productQuantityByAdmin");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavigationBar />
      <DashboardHeading>Admin Dashboard</DashboardHeading>
      {isAdmin && (
        <ButtonContainer>
          <StyledButton onClick={navigateToProductManagement}>
            Product Management
          </StyledButton>
        </ButtonContainer>
      )}

    </div>
  );
};

export default AdminPage;
