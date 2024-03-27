import React from "react";
import { styled } from "styled-components";


const NavbarContainer = styled.nav`
  padding: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  height: 10vh;
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


export const NavigationBarforcheckoutpage = () => {



  return (
    <NavbarContainer>
      <LogoContainer>
        <LogoImage src="/Mainlogo.svg" alt="Logo"  />
      </LogoContainer>

 </NavbarContainer>)
};
export default NavigationBarforcheckoutpage;
