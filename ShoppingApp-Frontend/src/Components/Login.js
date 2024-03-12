import React, { useEffect } from "react";
import { Amplify } from "aws-amplify";
import awsconfig from "../aws-exports";
import { Authenticator } from "@aws-amplify/ui-react";
import styled from "styled-components";
import "@aws-amplify/ui-react/styles.css";
import { Hub } from "aws-amplify/utils";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

Amplify.configure(awsconfig);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: pink;
  height: 100vh;
`;

function Login() {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signedIn":
          console.log("User signed in", data);
          handleLoginSuccess(); // Redirect to homepage on successful login
          break;
        case "signedOut":
          console.log("User signed out");
          break;
        default:
          break;
      }
    });

    return () => {};
  }, []);

  // Function to handle successful login and redirect to homepage
  const handleLoginSuccess = () => {
    // Redirect to the homepage
    navigate("/homepage");
  };

  return (
    <Container>
      <Authenticator>
        {({ signOut, user }) => (
          <div className="App">
            <p>Hey {user.username}, welcome to my channel, with auth!</p>
            <button onClick={signOut}>Sign out</button>
          </div>
        )}
      </Authenticator>
    </Container>
  );
}

export default Login;
