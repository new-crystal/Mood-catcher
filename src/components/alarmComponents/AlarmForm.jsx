import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getAlarm, __deleteAllAlarm } from "../../redux/async/alarm";
import Swal from "sweetalert2";
import { Fragment } from "react";
import AlarmListForm from "./AlarmList";

const AlarmForm = () => {
  const dispatch = useDispatch();
  const alarms = useSelector((state) => state.alarm.notices);
  const alarmStatus = useSelector((state) => state.alarm.deleteAlarm);
  const alarmList = [...alarms].reverse();

  //전체 알람 삭제
  const delAllAlarm = () => {
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
        dispatch(__deleteAllAlarm());
      }
    });
  };

  //알람 조회
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
                  <ConfirmBtn
                    style={{ cursor: "pointer" }}
                    onClick={() => delAllAlarm()}
                  >
                    전체알림삭제
                  </ConfirmBtn>
                </BtnWrap>
              </TitleWrap>
              {alarms.length === 0 ? (
                <AlarmBox>
                  <p>아직 새로운 알림이 없습니다!</p>
                </AlarmBox>
              ) : (
                alarmList?.map((alarm) => {
                  return <AlarmListForm alarm={alarm} key={alarm.noticeId} />;
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
  width: 370px;
  margin: 10px auto 0px;
  display: flex;
`;

const Btn = styled.button`
  width: 370px;
  height: 50px;
  border-radius: 20px;
  border: 0px;
  margin: 10px auto;
  background: ${(props) => (props.kakao ? "#F4E769" : "#C4C2CA")};
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  & > a,
  p {
    color: #2d273f;
    font-family: "Noto Sans KR", sans-serif;
    text-decoration: none;
    font-weight: bold;
    font-size: 16px;
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
  max-width: 428px;
  width: 100vw;
`;

const AlarmContainer = styled.div``;
const AlarmList = styled.div`
  width: 370px;
  margin: 10px auto 0;
  background-color: #e6e5ea;
  border-radius: 20px;
  color: #7b758b;
  display: flex;
  align-items: baseline;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 60px;
  overflow-x: hidden;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

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
  h4 {
    margin: 20px 0 7px 20px;
    color: #2d273f;
    font-family: "Noto Sans KR", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
  }
`;
const BtnWrap = styled.div`
  width: 100px;
  display: flex;
  flex-direction: row;
  margin: 0 0 0 160px;
  padding: 0px;
`;
const ConfirmBtn = styled.button`
  background-color: rgba(0, 0, 0, 0);
  color: #7b758b;
  border: 0px;
  margin: 0 -10px 0 0;
  font-family: "Roboto";
  font-style: Bold;
  font-weight: 700;
  font-size: 11px;
  position: relative;
  top: -4px;
  right: -20px;
`;

const AlarmBox = styled.div`
  width: 360px;
  height: 55px;
  background-color: white;
  border-radius: 20px;
  margin: 5px auto;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: baseline;
  flex-direction: row;

  & p {
    /* margin-top: 5px; */
    width: 260px;
    margin-left: 5px;
    /* font-family: "Roboto"; */
    font-family: "Noto Sans KR", sans-serif;
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

export default AlarmForm;
