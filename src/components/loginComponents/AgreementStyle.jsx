import styled from "styled-components";
import flex from "./flex";

export const FlexRowDiv = styled.div`
  ${flex({})}
`;

export const StButton = styled.button`
  margin: 0 4.06px 0 4.06px;
  border-radius: 8px;
  border: 1px solid ${(props) => (props.color === "brown" ? "none" : "#CACDD3")};
  width: 132px;
  height: 48px;
  background-color: ${(props) => (props.color === "brown" ? "none" : "black")};
  color: ${(props) => (props.color === "brown" ? "black" : "white")};
  @media screen and (max-width: 350px) {
    width: 100px;
  }
`;

export const StModalGlobal = styled.div`
  ${flex({})}
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 901;
  .StInnerContainer {
    ${flex({})}
    border-radius: 8px;
    width: 320px;
    height: 383px;
    background: var(--white);
    @media screen and (max-width: 350px) {
      width: 270px;
    }
    .InfoContainer {
      ${flex({
        direction: "column",
      })}
      width: 300px;
      .TextContainer {
        ${flex({ justify: "flex-start" })}
        width: 100%;
        .missionTitle {
          font-weight: 700;
          font-family: "Noto Sans KR", sans-serif;
          font-size: 18px;
          color: var(--black);
          margin-bottom: 24px;
          @media screen and (max-width: 350px) {
            margin-left: 20px;
          }
        }
      }
      label {
        ${flex({})}
        margin-bottom: 24px;
        border: 1px solid var(--gray-3);
        border-radius: 100%;
        width: 193px;
        height: 193px;
      }
    }
  }
`;
