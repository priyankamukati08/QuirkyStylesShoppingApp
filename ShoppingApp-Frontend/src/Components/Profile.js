import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserInfo } from "../store/actions/userInfoActions";
import { updateUserInfo } from "../store/actions/userInfoActions";
import Cookies from "js-cookie";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NavigationBar from "./NavigationBar";

const MainProfileEditContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 2500px;
  margin: 0 auto;
  padding: 20px;
`;

const ProfileEditContainer = styled.div`
  width: 40%;
  margin-right: 500px;
`;

const ProfilePictureContainer = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
  margin-top: 80px;
  margin-left: 10px;
`;

const ProfilePictureWrapper = styled.div`
  margin-bottom: 20px;
`;

const ProfileEditButtonWrapper = styled.div`
  text-align: center;
`;

const ProfileEditHeading = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const ProfileDetailsBox = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 80px;
  background-color: white;
  color: black;
  border: 1px solid black;
  border-radius: 5px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const Button1 = styled.button`
  padding: 15px 320px;
  background-color: #ff1493;
  color: white;
  border: none;
  font-size: 20px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const Button2 = styled.button`
  padding: 10px 50px;
  background-color: white;
  color: black;
  border: 1px solid black;
  border-radius: 5px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const ProfilePicture = styled.img`
  width: 300px; /* Adjust the width to your desired size */
  height: 300px;
  border-radius: 50%;
  border: 2px solid black;
  object-fit: cover;
`;

const ProfileEdit = () => {
  const userInfo = useSelector((state) => state.userInfoDetail.userInfoDetails);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    gender: "",
    birthday: "",
    age: "",
  });

  const dispatch = useDispatch();
  const user_id = Cookies.get("userID");

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        await dispatch(fetchUserInfo(user_id));
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInformation();
  }, [dispatch, user_id]);

  useEffect(() => {
    if (userInfo) {
      const userData = {
        fullName: userInfo.name,
        email: userInfo.email,
        mobileNumber: userInfo.phone_number.startsWith("+1")
          ? userInfo.phone_number // Use the existing number if it already starts with +1
          : "+1" + userInfo.phone_number, // Add +1 if it doesn't start with it
        gender: userInfo.gender,
        birthday: userInfo.birthdate,
      };
      setFormData(userData);
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleDateChange = (date) => {
    const age = calculateAge(date); // Calculate age from selected date
    setFormData((prevFormData) => ({
      ...prevFormData,
      birthday: date,
      age: age, // Update age field in formData state
    }));
  };


 const handleSubmit = (e) => {
   e.preventDefault();
   // Check if any information has been changed
   const isInfoChanged = Object.keys(formData).some(
     (key) => formData[key] !== userInfo[key]
   );
   if (isInfoChanged) {
     // Display an alert message indicating that the information has been saved
     alert("Information saved successfully!");
   }
   // Check if the mobile number starts with +1, if not, add it
   const mobileNumber = formData.mobileNumber.startsWith("+1")
     ? formData.mobileNumber
     : "+1" + formData.mobileNumber;
   const updatedFormData = {
     ...formData,
     mobileNumber: mobileNumber,
   };
   dispatch(updateUserInfo(user_id, updatedFormData));
 };



  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavigationBar />
      <MainProfileEditContainer>
        <ProfilePictureContainer>
          <ProfilePictureWrapper>
            <ProfilePicture src="profilepic.jpeg" alt="Profile" />
          </ProfilePictureWrapper>
          <ProfileEditButtonWrapper>
            <Button2 type="submit">Edit Profile Picture</Button2>
          </ProfileEditButtonWrapper>
        </ProfilePictureContainer>
        <ProfileEditContainer>
          <ProfileEditHeading>Edit Details</ProfileEditHeading>
          <ProfileDetailsBox>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="mobileNumber">Mobile Number</Label>
                <Input
                  type="text"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="gender">Gender</Label>
                <Select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value=""></option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="birthday">Birthday</Label>
                <DatePicker
                  id="birthday"
                  name="birthday"
                  selected={formData.birthday}
                  onChange={handleDateChange}
                  dateFormat="MM/dd/yyyy"
                />
              </FormGroup>
              <div style={{ textAlign: "center" }}>
                <Button1 type="submit">Save Details</Button1>
              </div>
            </form>
          </ProfileDetailsBox>
        </ProfileEditContainer>
      </MainProfileEditContainer>
    </>
  );
};

export default ProfileEdit;
