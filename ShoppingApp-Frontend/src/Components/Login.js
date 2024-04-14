import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Amplify } from "aws-amplify";
import awsconfig from "../aws-exports";
import { Authenticator } from "@aws-amplify/ui-react";
import styled from "styled-components";
import "@aws-amplify/ui-react/styles.css";
import { Hub } from "aws-amplify/utils";
import { useNavigate } from "react-router-dom";
import { fetchUserAttributes } from "aws-amplify/auth";
import { addUserInfo } from "../store/actions/userInfoActions";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

Amplify.configure(awsconfig);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: pink;
  height: 100vh;
`;

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.addUserInfo);

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      const context = this;
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  };

  const handleLoginSuccess = async (userData) => {
    try {
      const userAttributes = await fetchUserAttributes();
      dispatch(addUserInfo(userAttributes));
    } catch (error) {
      console.error("Error handling login success:", error);
    }
  };

  useEffect(() => {
    if (userInfo.addUserInfo) {
      Cookies.set("userID", userInfo.addUserInfo.id);
      Cookies.set("userName", userInfo.addUserInfo.name);
      Cookies.set("userPhoneNumber", userInfo.addUserInfo.phone_number);
      navigate("/homepage");
    } else if (userInfo.error) {
      alert("User Authenication Failed");
    } else {
    }
  }, [userInfo, navigate]);

  const debouncedHandleLoginSuccess = debounce(handleLoginSuccess, 1000);

  useEffect(() => {
    if (userInfo.addUserInfo) {
      const { user_type } = userInfo.addUserInfo;
      if (user_type === "admin") {
        navigate("/adminpage");
      } else {
        navigate("/homepage");
      }
    }
  }, [userInfo.addUserInfo, navigate]);

  useEffect(() => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signedIn":
          console.log("User signed in", data);
          debouncedHandleLoginSuccess(data);
          break;
        case "signedOut":
          console.log("User signed out");
          break;
        default:
          break;
      }
    });

    return () => {};
  }, [debouncedHandleLoginSuccess]);

  return (
    <Container>
      <Authenticator
        signUpAttributes={[
          "name",
          "email",
          "address",
          "birthdate",
          "phone_number",
          "gender",
          "nickname",
        ]}
      >
        {/* {({ signOut, user }) => (
          <div className="App">
          </div>
        )} */}
      </Authenticator>
    </Container>
  );
}

export default Login;
