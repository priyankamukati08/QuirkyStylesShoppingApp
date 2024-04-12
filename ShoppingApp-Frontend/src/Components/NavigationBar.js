import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { fetchAuthSession, signOut } from "aws-amplify/auth";
import Cookies from "js-cookie";

const NavbarContainer = styled.nav`
  padding: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  height: 10vh;
  box-shadow: 1px 5px 5px #888888;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  width: 150px;
  height: 60px;
  margin-left: 35px; /* Adjusted margin-left */
`;

const LogoImage = styled.img`
  max-width: 300%;
  max-height: 180%;
`;

const NavMenu = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
`;

const NavItem = styled.li`
  padding: 20px;
  text-align: left;
  text-decoration: none;
  font-size: 17px;
  letter-spacing: 0.3px;
  color: #282c3f;
  border-bottom: none;
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;
  position: relative;
`;

const NavLinks = styled(NavLink)`
  color: black;
  text-decoration: none;
  &:hover {
    color: #ffcc00;
  }
`;

const BiggerNavLinks = styled(NavLinks)`
  font-size: 14px;
`;

const DropdownContent = styled.div`
  display: ${(props) => (props.visible ? "block" : "none")};
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #f9f9f9;
  min-width: 160px;
  z-index: 1;
  font-size: 16px;
  text-transform: capitalize;
  font-weight: bold;
`;
const DropdownContent1 = styled.div`
  display: ${(props) => (props.visible ? "block" : "none")};
  position: absolute;
  right: 0;
  top: 100%;
  padding: 20px;
  background-color: white;
  z-index: 1;
  font-size: 15px;
  text-transform: capitalize;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.9);
  transition: opacity 0.3s ease-in-out; /* Add transition effect */
  opacity: ${(props) => (props.visible ? "1" : "0")}; /* Set initial opacity */
`;

const DropdownContent2 = styled.div`
  display: ${(props) => (props.visible ? "block" : "none")};
  position: absolute;
  right: 0;
  top: 100%;
  height: 370px;
  padding: 30px;
  background-color: white;
  z-index: 1;
  font-size: 18px;
  text-transform: capitalize;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.9);
  transition: opacity 0.3s ease-in-out; /* Add transition effect */
  opacity: ${(props) => (props.visible ? "1" : "0")}; /* Set initial opacity */
`;

const DropdownLink = styled(Link)`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  pointer-events: auto;
  cursor: pointer;
  color: ${(props) => {
    switch (props.category) {
      case "men":
        return "#FF4500";
      case "women":
        return "#FF1493";
      case "kids":
        return "#FF8C00";
      case "home&living":
        return "#BA55D3";
      case "beauty":
        return "#008080";
      default:
        return "#000000";
    }
  }};
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  flex-grow: 2;
  border: 3px solid #ccc;
  border-radius: 5px;
  max-width: 60rem;
  margin-left: 170px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  flex-grow: 1;
  font-size: 17px;
`;

const SearchIconContainer = styled.div`
  display: flex;
  align-items: left;
  width: 50px;
  height: 30px;
`;

const SearchIconImage = styled.img`
  width: 60%;
  height: 100%;
`;

const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileText = styled.div`
  font-size: 14px;
`;

const WishlistContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
`;

const IconImage = styled.img`
  width: 2rem;
  height: 2rem;
`;
const BagContent = styled(WishlistContent)`
  cursor: ${(props) => (props.authenticated ? "pointer" : "not-allowed")};
`;
const ProfilePopupText = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
  text-align: left;
`;
const ProfilePopupText2 = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
  text-align: left;
  color: #ff0090;
`;
const ProfilePopupText1 = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
  text-align: left;
`;

const ProfilePopupLink = styled.a`
  display: block;
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  color: ${(props) => (props.isButton ? "#FFFFFF" : "#282c3f")};
  background-color: ${(props) => (props.isButton ? "#FF1493" : "transparent")};
  border: ${(props) => (props.isButton ? "none" : "1px solid #ccc")};
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.isButton ? "#ff80bf" : "#f0f0f0")};
  }
`;
const ProfilePopupLink1 = styled.a`
  display: block;
  padding: 8px 0;
  text-align: left;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
  color: black;

  &:hover {
    background-color: ${(props) => (props.isButton ? "#ff80bf" : "#f0f0f0")};
  }
`;

export const NavigationBar = (props) => {
  const { userAuthRequired } = props;
  const [menDropdownVisible, setMenDropdownVisible] = useState(false);
  const [womenDropdownVisible, setWomenDropdownVisible] = useState(false);
  const [kidsDropdownVisible, setKidsDropdownVisible] = useState(false);
  const [homeAndLivingsDropdownVisible, setHomeAndLivingsDropdownVisible] =
    useState(false);
  const [beautyDropdownVisible, setBeautyDropdownVisible] = useState(false);
  const [profilePopupVisible, setProfilePopupVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const userName = Cookies.get("userName");
  const userPhoneNumber = Cookies.get("userPhoneNumber");

  let navigate = useNavigate();

  const routeChange = () => {
    let path = `/homepage`;
    navigate(path);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await checkAuthStatus();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (userAuthRequired && isAuthenticated === false) {
      let path = `/Login`;
      navigate(path);
    }
  }, [isAuthenticated, navigate, userAuthRequired]);

  const checkAuthStatus = async () => {
    try {
      await fetchAuthSession();
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setIsAuthenticated(false);
      console.log("logout");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleLogoutClick = (event) => {
    event.preventDefault();
    handleLogout();
  };

  const renderProfileDropdown = () => {
    if (isAuthenticated) {
      return (
        <DropdownContent2 visible={profilePopupVisible}>
          <ProfilePopupText2>Hello {userName}</ProfilePopupText2>
          <ProfilePopupText1>{userPhoneNumber}</ProfilePopupText1>
          <hr />
          <ProfilePopupLink1 href="/Ordersdetails">Orders</ProfilePopupLink1>
          <ProfilePopupLink1 href="/WishlistPage">Wishlist</ProfilePopupLink1>
          <ProfilePopupLink1 href="/contact-us">Contact Us</ProfilePopupLink1>
          <hr />
          <ProfilePopupLink1 href="/profile">Edit Profile</ProfilePopupLink1>
          <ProfilePopupLink1 href="/homepage" onClick={handleLogoutClick}>
            Logout
          </ProfilePopupLink1>
        </DropdownContent2>
      );
    } else {
      return (
        <DropdownContent1 visible={profilePopupVisible}>
          <ProfilePopupText>Welcome</ProfilePopupText>
          <ProfilePopupText>
            To access account and manage orders
          </ProfilePopupText>
          <ProfilePopupLink href="/login" isButton>
            LOGIN / SIGNUP
          </ProfilePopupLink>
          <hr />
          <ProfilePopupLink1 href="/Ordersdetails">Orders</ProfilePopupLink1>
          <ProfilePopupLink1 href="/WishlistPage">Wishlist</ProfilePopupLink1>
          <ProfilePopupLink1 href="/contact-us">Contact Us</ProfilePopupLink1>
        </DropdownContent1>
      );
    }
  };

  return (
    <NavbarContainer>
      <LogoContainer>
        <LogoImage src="/Mainlogo.svg" alt="Logo" onClick={routeChange} />
      </LogoContainer>
      <NavMenu>
        <NavItem
          onMouseEnter={() => setMenDropdownVisible(true)}
          onMouseLeave={() => setMenDropdownVisible(false)}
        >
          <NavLinks to="/Mens">MEN</NavLinks>
          <DropdownContent visible={menDropdownVisible}>
            <DropdownLink category="men">Clothes</DropdownLink>
            <DropdownLink category="men">Footwear</DropdownLink>
            <DropdownLink category="men">Watches & Sunglasses</DropdownLink>
            <DropdownLink category="men">Fashion Accessories</DropdownLink>
          </DropdownContent>
        </NavItem>

        <NavItem
          onMouseEnter={() => setWomenDropdownVisible(true)}
          onMouseLeave={() => setWomenDropdownVisible(false)}
        >
          <NavLinks to="/Women">WOMEN</NavLinks>
          <DropdownContent visible={womenDropdownVisible}>
            <DropdownLink to="/Womens" category="women">
              Clothes
            </DropdownLink>
            <DropdownLink category="women">Footwear</DropdownLink>
            <DropdownLink category="women">Watches & Sunglasses</DropdownLink>
            <DropdownLink category="women">Jewellery</DropdownLink>
          </DropdownContent>
        </NavItem>

        <NavItem
          onMouseEnter={() => setKidsDropdownVisible(true)}
          onMouseLeave={() => setKidsDropdownVisible(false)}
        >
          <NavLinks to="/Kids">KIDS</NavLinks>
          <DropdownContent visible={kidsDropdownVisible}>
            <DropdownLink category="kids">Boys Clothing</DropdownLink>
            <DropdownLink category="kids">Girls Clothing</DropdownLink>
            <DropdownLink category="kids">Footwear</DropdownLink>
            <DropdownLink category="kids">Toys & Games</DropdownLink>
          </DropdownContent>
        </NavItem>
        <NavItem
          onMouseEnter={() => setHomeAndLivingsDropdownVisible(true)}
          onMouseLeave={() => setHomeAndLivingsDropdownVisible(false)}
        >
          <NavLinks to="/Home&Living">HOME & LIVING</NavLinks>
          <DropdownContent visible={homeAndLivingsDropdownVisible}>
            <DropdownLink category="home&living">
              Bed Linen & Furnishing
            </DropdownLink>
            <DropdownLink category="home&living">Flooring</DropdownLink>
            <DropdownLink category="home&living">Lamps & Lighting</DropdownLink>
            <DropdownLink category="home&living">Home Decor</DropdownLink>
          </DropdownContent>
        </NavItem>
        <NavItem
          onMouseEnter={() => setBeautyDropdownVisible(true)}
          onMouseLeave={() => setBeautyDropdownVisible(false)}
        >
          <NavLinks to="/Beauty">BEAUTY</NavLinks>
          <DropdownContent visible={beautyDropdownVisible}>
            <DropdownLink category="beauty">Makeup</DropdownLink>
            <DropdownLink category="beauty">Skincare,Bath & Body</DropdownLink>
            <DropdownLink category="beauty">Haircare</DropdownLink>
            <DropdownLink category="beauty">Fragrances</DropdownLink>
          </DropdownContent>
        </NavItem>
      </NavMenu>

      <SearchBarContainer>
        <SearchIconContainer>
          <SearchIconImage src="/searchicon.png"></SearchIconImage>
        </SearchIconContainer>
        <SearchInput placeholder="Search for products, brands, and more"></SearchInput>
      </SearchBarContainer>

      <NavMenu>
        <NavItem
          onMouseEnter={() => setProfilePopupVisible(true)}
          onMouseLeave={() => setProfilePopupVisible(false)}
        >
          <ProfileContent>
            <IconImage src="/profileiconimg.png"></IconImage>
            <ProfileText>Profile</ProfileText>
          </ProfileContent>
          {renderProfileDropdown()}
        </NavItem>
        <NavItem>
          <WishlistContent
            authenticated={isAuthenticated}
            onClick={() => {
              if (!isAuthenticated) {
                navigate("/login");
              }
            }}
          >
            <IconImage src="/wishlisticonimg.png"></IconImage>
            {isAuthenticated ? (
              <BiggerNavLinks to="/WishlistPage">Wishlist</BiggerNavLinks>
            ) : (
              <BiggerNavLinks>Wishlist</BiggerNavLinks>
            )}
          </WishlistContent>
        </NavItem>
        <NavItem>
          <BagContent
            authenticated={isAuthenticated}
            onClick={() => {
              if (!isAuthenticated) {
                navigate("/login");
              }
            }}
          >
            <IconImage src="/bagiconimg.png"></IconImage>
            {isAuthenticated ? (
              <BiggerNavLinks to="/userCart">Bag</BiggerNavLinks>
            ) : (
              <BiggerNavLinks>Bag</BiggerNavLinks>
            )}
          </BagContent>
        </NavItem>
      </NavMenu>
    </NavbarContainer>
  );
};

NavigationBar.defaultProps = {
  userAuthRequired: false, // Default value for name prop
};

export default NavigationBar;
