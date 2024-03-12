import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FooterContainer from "./Footer";


const Wallpaper = styled.div`
  background-image: url("/landingpageimage.jpg");
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const AppName = styled.h1`
  font-size: 70px;
  color: #ff69b4;
  margin-bottom: 10px;
  position: absolute;
  top: -50px;
  left: 40px;
`;
const GetStartedButton = styled.button`
  background-color: greenyellow;
  color: #000000;
  padding: 20px 40px;
  font-size: 30px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
  bottom: 450px;
  left: 50%;
  transform: translateX(-50%);
`;

function Landing() {
  let navigate = useNavigate();

  const routeChange = () => {
    let path = `/homepage`;
    navigate(path);
  };

  return (
    <>
      <Wallpaper variant="primary" onClick={routeChange}>
        <AppName> Welcome to QuirkyStyles </AppName>
        <GetStartedButton>
          Shop Stylishly
        </GetStartedButton>{" "}
      </Wallpaper>
      <FooterContainer></FooterContainer>
    </>
  );
}

export default Landing;
