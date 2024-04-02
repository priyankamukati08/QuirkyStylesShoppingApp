import React from "react";
import ImageSlider from "./ImageSlider";
import FooterContainer from "./Footer";
import NavigationBar from "./NavigationBar";

import styled from "styled-components";

const ShadedComponent = styled.div`


  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Adjust the shadow color and intensity */
`;


function Homepage() {
  const imagePairs = [
    ["/men.svg", "/men'sFasion.svg",'/Mens'],
    ["/women.svg", "/women'sFASHION.svg","/Women"],
    ["/kids.svg", "/kids'sFashion.svg",'/Kids'],
    ["/home.svg", "/homeAndLivingCollection.svg","/Home&Living"],
    ["/beauty.svg", "/beautyProducts2.svg",'/Beauty'],
  ];

  return (
    <>
      <NavigationBar />
      <ShadedComponent>
        <div style={{ marginTop: "50px" }} />
        <ImageSlider imagePairs={imagePairs} />
        <div style={{ marginTop: "200px" }} />
        <div
          style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold" }}
        ></div>
        <FooterContainer />
      </ShadedComponent>
    </>
  );
}

export default Homepage;
