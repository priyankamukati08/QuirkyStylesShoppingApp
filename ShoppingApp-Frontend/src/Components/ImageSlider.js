import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const StyledImageSlider = styled(Slider)`
  .slick-slide {
    display: flex;
    justify-content: space-between;
    align-items: center; /* Align images vertically */
  }
`;

const ImagePairContainer = styled.div`
  display: flex;
  width: 100%;
  height: 72vh; /* Set fixed height for both images */
`;

const LeftImage = styled.img`
  width: 90%; /* Keep the width unchanged */
  height: 65vh; /* Reduce the height */
  object-fit: contain; /* Adjust to contain */
`;

const RightImage = styled.img`
  width: 30%; /* Keep the width unchanged */
  height: 65vh; /* Reduce the height */
  object-fit: contain; /* Adjust to contain */
`;

const ImageSlider = ({ imagePairs }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  return (
    <StyledImageSlider {...settings}>
      {imagePairs.map((pair, index) => (
        <div key={index}>
          <a href={pair[2]}>
            <ImagePairContainer>
              <LeftImage src={pair[0]} alt={`Left Image ${index + 1}`} />
              <RightImage src={pair[1]} alt={`Right Image ${index + 2}`} />
            </ImagePairContainer>
          </a>
        </div>
      ))}
    </StyledImageSlider>
  );
};

export default ImageSlider;
