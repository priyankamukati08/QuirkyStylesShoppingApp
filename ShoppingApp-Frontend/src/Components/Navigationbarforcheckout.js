import React from "react";
import { styled } from "styled-components";
import { useLocation } from "react-router-dom";

const NavbarContainer = styled.nav`
  padding: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  height: 10vh;
  box-shadow: 1px 5px 8px #888888;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  width: 150px;
  height: 60px;
  margin-left: 80px;
`;

const LogoImage = styled.img`
  width: 400%;
  height: 180%;
`;

const LogoImage1 = styled.img`
  width: 80%;
  height: 180%;
  margin-left: -100px;
`;

const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto; /* Center align the LinksContainer */
`;

const NavLink = styled.a`
  text-decoration: none;
  color: ${(props) => (props.active ? "green" : "black")};
  margin-right: 20px;
  text-transform: uppercase; /* Convert text to uppercase */
`;

const Divider = styled.span`
  margin-right: 10px;
`;

const SecureText = styled.span`
  margin-left: -25px; /* Adjust margin as needed */
`;

export const NavigationBarforcheckoutpage = () => {
  const location = useLocation();

  return (
    <NavbarContainer>
      <LogoContainer>
        <LogoImage src="/Mainlogo.svg" alt="Logo" />
      </LogoContainer>
      <LinksContainer>
        <NavLink
          active={location.pathname.includes("/userCart")}
          href="/userCart"
        >
          BAG
        </NavLink>
        <Divider>-----------------</Divider>
        {location.pathname === "/userCart" && <span>ADDRESS & PAYMENT</span>}
        {location.pathname === "/checkout" && (
          <span style={{ color: "green", marginRight: "20px" }}>
            ADDRESS & PAYMENT
          </span>
        )}
      </LinksContainer>
      <LogoContainer>
        <LogoImage1 src="/securelogo.jpeg" alt="Logo" />
        <SecureText>100% SECURE</SecureText>
      </LogoContainer>
    </NavbarContainer>
  );
};

export default NavigationBarforcheckoutpage;
