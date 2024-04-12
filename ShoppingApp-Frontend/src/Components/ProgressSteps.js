// ProgressSteps.js
import React from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 16px;
`;

const StepContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 70px;
  position: relative;
  :before {
    content: "";
    position: absolute;
    background: #f3e7f3;
    height: 4px;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }
  :after {
    content: "";
    position: absolute;
    background: #4a154b;
    height: 4px;
    width: ${({ width }) => width};
    top: 50%;
    transition: 0.4s ease;
    transform: translateY(-50%);
    left: 0;
  }
`;

const StepWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const StepStyle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 3px solid
    ${({ step }) => (step === "completed" ? "#4A154B" : "#F3E7F3")};
  transition: 0.4s ease;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StepCount = styled.span`
  font-size: 19px;
  color: #f3e7f3;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const CheckMark = styled.div`
  font-size: 26px;
  font-weight: 600;
  color: #4a154b;
  -ms-transform: scaleX(-1) rotate(-46deg); /* IE 9 */
  -webkit-transform: scaleX(-1) rotate(-46deg); /* Chrome, Safari, Opera */
  transform: scaleX(-1) rotate(-46deg);
`;

const StepsLabelContainer = styled.div`
  position: absolute;
  top: 66px;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StepLabel = styled.span`
  font-size: 19px;
  color: #4a154b;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const ProgressSteps = ({ userOrder }) => {
  const steps = [
    {
      label: "Ordered",
      step: 1,
    },
    {
      label: "Processing",
      step: 2,
    },
    {
      label: "Shipped",
      step: 3,
    },
    {
      label: "In Transit",
      step: 4,
    },
    {
      label: "Arriving Tomorrow by 10 PM",
      step: 5,
    },
    {
      label: "Out for Delivery",
      step: 6,
    },
    {
      label: "Delivered",
      step: 7,
    },
  ];

  const getCurrentStatusIndex = () => {
    if (!userOrder || !userOrder.length) return -1;

    const status = userOrder[0].delivery_status;

    switch (status) {
      case "Ordered":
        return 0;
      case "Processing":
        return 1;
      case "Shipped":
        return 2;
      case "In Transit":
        return 3;
      case "Arriving Tomorrow by 10 PM":
        return 4;
      case "Out for Delivery":
        return 5;
      case "Delivered":
        return 6;
      default:
        return -1;
    }
  };

  const totalSteps = steps.length;
  const activeStep = getCurrentStatusIndex() + 1;
  const width = `${(100 / (totalSteps - 1)) * (activeStep - 1)}%`;

  return (
    <MainContainer>
      <StepContainer width={width}>
        {steps.map(({ step, label }) => (
          <StepWrapper key={step}>
            <StepStyle step={activeStep >= step ? "completed" : "incomplete"}>
              {activeStep > step ? (
                <CheckMark>L</CheckMark>
              ) : (
                <StepCount>{step}</StepCount>
              )}
            </StepStyle>
            <StepsLabelContainer>
              <StepLabel key={step}>{label}</StepLabel>
            </StepsLabelContainer>
          </StepWrapper>
        ))}
      </StepContainer>
    </MainContainer>
  );
};

export default ProgressSteps;
