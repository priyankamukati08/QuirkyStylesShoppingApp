import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  padding: 50px 0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const Section = styled.div`
  flex: 1 1 250px;
  margin-bottom: 30px;
  color: #333;
  margin-left: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const SocialIcon = styled.a`
  color: #333;
  font-size: 24px;
  transition: color 0.3s ease;
  &:hover {
    color: #007bff;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Section>
          <SectionTitle>About Us</SectionTitle>
          <p>
            Quirkstyles is your destination for the latest fashion trends,
            offering a wide range of clothing, accessories, and more.
          </p>
        </Section>
        <Section>
          <SectionTitle>Customer Service</SectionTitle>
          <LinkList>
            <ListItem>
              <a href="/faq">FAQ</a>
            </ListItem>
            <ListItem>
              <a href="/shipping">Shipping Information</a>
            </ListItem>
            <ListItem>
              <a href="/returns">Returns & Exchanges</a>
            </ListItem>
            <ListItem>
              <a href="/contact">Contact Us</a>
            </ListItem>
          </LinkList>
        </Section>
        <Section>
          <SectionTitle>Quick Links</SectionTitle>
          <LinkList>
            <ListItem>
              <a href="/shop">Shop</a>
            </ListItem>
            <ListItem>
              <a href="/wishlist">Wishlist</a>
            </ListItem>
            <ListItem>
              <a href="/account">My Account</a>
            </ListItem>
          </LinkList>
        </Section>
        <Section>
          <SectionTitle>Contact Us</SectionTitle>
          <p>123 Quirkstyles Avenue</p>
          <p>City, State, 12345</p>
          <p>Email: info@quirkstyles.com</p>
        </Section>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
