import React, { useState } from "react";
import styled from "styled-components";

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
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    gender: "Select",
    birthday: "",
    alternateMobile: "+1|Mobile Number",
    hintName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to submit the edited profile data
    console.log("Edited profile data:", formData);
  };

  return (
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
              <div style={{ display: "flex", alignItems: "center" }}>
                <Input
                  type="text"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  disabled
                />
                <Button type="button">Change</Button>
              </div>
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
              <Label htmlFor="birthday">Birthday (dd/mm/yyyy)</Label>
              <Input
                type="text"
                id="birthday"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="alternateMobile">Alternate mobile details</Label>
              <Input
                type="text"
                id="alternateMobile"
                name="alternateMobile"
                value={formData.alternateMobile}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="hintName">Hint name</Label>
              <Input
                type="text"
                id="hintName"
                name="hintName"
                value={formData.hintName}
                onChange={handleChange}
              />
            </FormGroup>
            <div style={{ textAlign: "center" }}>
              <Button1 type="submit">Save Details</Button1>
            </div>
          </form>
        </ProfileDetailsBox>
      </ProfileEditContainer>
    </MainProfileEditContainer>
  );
};

export default ProfileEdit;
