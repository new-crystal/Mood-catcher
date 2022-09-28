import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __getAlarm, __deleteAlarm } from "../../redux/async/alarm";
import Swal from "sweetalert2";
import { Fragment } from "react";

const AlarmForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [alarmStatus, setAlarmStatus] = useState(false);
  const alarms = useSelector((state) => state.alarm.notices);
  const alarmList = [...alarms].reverse();

  console.log(alarms);

  const delAlarm = () => {
    Swal.fire({
      title: "알림을 전부 삭제하시겠습니까?",
      text: "지우신 알림은 되돌릴 수 없습니다!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "삭제되었습니다",
          "캐처님의 알람이 모두 삭제되었습니다",
          "success"
        );
        dispatch(__deleteAlarm());
        setAlarmStatus(!alarmStatus);
      }
    });
  };

  useEffect(() => {
    dispatch(__getAlarm());
  }, [alarmStatus]);

  return (
    <Fragment>
      <Container>
        <Grid>
          <AlarmContainer>
            <BtnBox>
              <Btn>
                <a
                  href="https://forms.gle/Eg7LN2yS1J5LeUwE9"
                  target="_blank"
                  rel="noreferrer"
                >
                  설문조사하러가기
                </a>
              </Btn>
            </BtnBox>

            <AlarmList>
              <TitleWrap>
                <h4>나의 알림</h4>
                <BtnWrap>
                  <ConfirmBtn onClick={() => delAlarm()}>알림삭제</ConfirmBtn>
                  <BackBtn onClick={() => navigate(-1)}>✕</BackBtn>
                </BtnWrap>
              </TitleWrap>
              {alarms.length === 0 ? (
                <AlarmBox>
                  <p>아직 새로운 알림이 없습니다!</p>
                </AlarmBox>
              ) : (
                alarmList?.map((alarm, idx) => {
                  return alarm?.postId === -1 ? (
                    <>
                      <AlarmBox key={idx}>
                        <AlarmImg url={alarm.imgUrl}> </AlarmImg>
                        <TextBox>
                          <p>{alarm.msg}</p>
                        </TextBox>
                        <TimeText>{alarm.createdAt}</TimeText>
                      </AlarmBox>
                    </>
                  ) : (
                    <>
                      <AlarmBox
                        key={idx}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          navigate(
                            `/item_detail/${alarm.postId}/${alarm.userId}`
                          );
                          window.location.reload();
                        }}
                      >
                        <AlarmImg url={alarm.imgUrl}> </AlarmImg>
                        <TextBox>
                          {alarm.duplecation > 1 && (
                            <p>
                              {alarm.msg}({alarm.duplecation})
                            </p>
                          )}
                          {alarm.duplecation === 1 && <p>{alarm.msg}</p>}
                        </TextBox>
                        <TimeText>{alarm.createdAt}</TimeText>
                        <ArrowBtn></ArrowBtn>
                      </AlarmBox>
                    </>
                  );
                })
              )}
            </AlarmList>
          </AlarmContainer>
        </Grid>
      </Container>
    </Fragment>
  );
};

const BtnBox = styled.div`
  width: 380px;
  margin: 10px auto;
  display: flex;
`;

const Btn = styled.button`
  width: 280px;
  height: 50px;
  border-radius: 20px;
  border: 0px;
  font-size: 20px;
  margin: 0 auto 0;
  /* margin-top: -100px; */
  font-family: "Roboto";
  line-height: 130%;
  font-weight: bold;
  background-color: #e6e5ea;
  color: #2d273f;
  & > a {
    color: #7b758b;
    text-decoration: none;
    cursor: default;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 926px; */
  & > span {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: auto;
    text-align: left;
  }
`;

const Grid = styled.div`
  margin: 0 auto;
  /* margin-top: 60px; */
  margin-bottom: 57px;
  max-width: 428px;
  width: 100vw;
  //height: calc(var(--vh, 1vh) * 100 + 50px);
  background: linear-gradient(#a396c9, #ffffff);
  /* background: #a396c9; */
`;

const AlarmContainer = styled.div`
  /* width: 100vw; */
  height: 100vh;
`;
const AlarmList = styled.div`
  width: 380px;
  /* margin-top: 50px;
  margin-left: 25px; */
  margin: 20px auto 0;
  background-color: #e6e5ea;
  border-radius: 20px;
  color: #7b758b;
  display: flex;
  align-items: baseline;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 60px;

  h4 {
    font-family: "Roboto";
    font-style: Bold;
    font-size: 18px;
    font-weight: 700;
    width: 80px;
    margin: 15px;
    margin-right: 0px;
  }
`;
const TitleWrap = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: row;
  justify-content: space-between;
`;
const BtnWrap = styled.div`
  width: 120px;
  display: flex;
  flex-direction: row;
  margin-left: 160px;
  padding: 0px;
`;
const ConfirmBtn = styled.button`
  /* width: 110px;
  height: 20px; */
  background-color: rgba(0, 0, 0, 0);
  color: #7b758b;
  border: 0px;
  margin-right: -10px;
  font-family: Roboto;
  font-style: Bold;
  font-weight: 700;
  font-size: 11px;
  position: relative;
  top: 6px;
`;
const BackBtn = styled.button`
  /* width: 20px;
  height: 20px; */
  background-color: rgba(0, 0, 0, 0);
  color: #7b758b;
  border: 0px;
  margin-left: 20px;
  margin-top: -5px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 100;
  font-size: 30px;
`;
const AlarmBox = styled.div`
  width: 356px;
  height: 55px;
  background-color: white;
  border-radius: 20px;
  margin: 5px auto;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: baseline;
  flex-direction: row;
  display: flex;
  overflow-x: hidden;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  & p {
    margin-top: 16px;
    margin-left: 20px;
    font-family: "Roboto";
    font-style: Bold;
    font-weight: 700;
    font-size: 13px;
    white-space: pre-wrap;
  }
  h5 {
    position: relative;
    top: -17px;
    color: #4e148c;
    font-size: 10px;
  }

  h6 {
    position: relative;
    top: -30px;
    left: 120px;
    cursor: pointer;
  }
`;
const TextBox = styled.div`
  width: 255px;
  margin: 0px;
`;
const TimeText = styled.div`
  width: 42px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 3px;
  position: relative;
  top: -19px;
  left: -10px;
  margin-right: 0px;
`;

const AlarmImg = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  margin-left: 15px;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});
`;

const ArrowBtn = styled.div`
  transform: scaleX(-1);
  width: 15px;
  height: 15px;
  background-position: center;
  background-size: cover;
  background-image: url("https://www.pngmart.com/files/16/Left-Arrow-Icon-PNG-Transparent-Image.png");
  position: relative;
  left: -10px;
  opacity: 70%;
`;

export default AlarmForm;
