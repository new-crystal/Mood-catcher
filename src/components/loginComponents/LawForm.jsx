import styled from "styled-components";
import flex from "./flex";
import { FlexRowDiv, StModalGlobal, StButton } from "./AgreementStyle";
import { generateWordSet } from "./fetchAgreement";
import { useState, useEffect } from "react";

const Agreement = ({ confirm, title, confirmTitle }) => {
  const [wordSet, setWordSet] = useState();
  const [flagBottom, setFlagBottom] = useState(true);
  useEffect(() => {
    generateWordSet().then((word) => {
      setWordSet(word);
    });
  }, []);

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 10;
    if (bottom) {
      setFlagBottom(false);
    }
  };

  const buttonDisabled = () => {
    return flagBottom;
  };

  return (
    <StModal>
      <div className="StInnerContainer">
        <div className="InfoContainer" style={{ alignItems: "center" }}>
          <span className="missionTitle">{title}</span>
          <StAgreementDiv onScroll={(e) => handleScroll(e)}>
            {wordSet?.map((v, i) => {
              return <p key={i}>{v}</p>;
            })}
          </StAgreementDiv>
          <FlexRowDiv>
            <StButton
              color="brown"
              onClick={confirm}
              disabled={buttonDisabled()}
              style={{ width: "260px" }}
            >
              {confirmTitle}
            </StButton>
          </FlexRowDiv>
        </div>
      </div>
    </StModal>
  );
};

export default Agreement;

const StModal = styled(StModalGlobal)`
  .StInnerContainer {
    height: 90%;

    .InfoContainer {
      ${flex({
        direction: "column",
        justify: "flex-start",
        align: "flex-start",
      })}
      height: 100%;
      .missionTitle {
        font-weight: 700;
        font-size: 18px;
        color: white;
        margin: 30px 0 6px 0;
      }
      span,
      p {
        font-size: 14px;
        color: white;
        margin: 4px 0;
      }
    }
  }
`;

const StAgreementDiv = styled.div`
  height: 85%;
  margin-bottom: 5px;
  overflow: scroll;
`;
