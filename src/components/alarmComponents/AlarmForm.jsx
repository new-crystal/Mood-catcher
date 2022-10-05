import { useEffect, Fragment } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

//통신
import { __getAlarm, __deleteAllAlarm } from "../../redux/async/alarm";

//컴포넌트
import AlarmListForm from "./AlarmList";

const AlarmForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alarms = useSelector((state) => state.alarm.notices); //전체 알림 리스트
  const alarmStatus = useSelector((state) => state.alarm.deleteAlarm); //알림 삭제 상태
  const alarmList = [...alarms].reverse(); //알림 최신순으로 뒤집기

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
        navigate("/main");
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
            {/* 알림이 없을 경우 */}
            {alarms.length === 0 ? (
              <AlarmBox>
                <p>아직 새로운 알림이 없습니다!</p>
              </AlarmBox>
            ) : (
              // 알림이 있을 경우
              alarmList?.map((alarm) => {
                return <AlarmListForm alarm={alarm} key={alarm.noticeId} />;
              })
            )}
          </AlarmList>
        </Grid>
      </Container>
    </Fragment>
  );
};

const BtnBox = styled.div`
  display: flex;
  margin: 10px auto 0px;
  width: 370px;
`;

const Btn = styled.button`
  display: flex;
  margin: 10px auto;
  border-radius: 20px;
  border: 0px;
  width: 370px;
  height: 50px;
  align-items: center;
  justify-content: center;
  background-color: #c4c2ca;
  cursor: default;
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

const AlarmList = styled.div`
  display: flex;
  margin: 10px auto 0;
  background-color: #e6e5ea;
  border-radius: 20px;
  padding-bottom: 60px;
  width: 370px;
  color: #7b758b;
  align-items: baseline;
  justify-content: center;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
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
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
  }
`;
const BtnWrap = styled.div`
  display: flex;
  margin: 0 0 0 160px;
  padding: 0px;
  width: 100px;
  flex-direction: row;
`;
const ConfirmBtn = styled.button`
  position: relative;
  top: 2px;
  right: -10px;
  margin: 0 -10px 0 0;
  border: 0px;
  background-color: rgba(0, 0, 0, 0);
`;

const AlarmBox = styled.div`
  display: flex;
  margin: 5px auto;
  border-radius: 20px;
  width: 360px;
  height: 55px;
  background-color: white;
  text-align: left;
  align-items: center;
  justify-content: baseline;
  flex-direction: row;

  & p {
    width: 260px;
    margin-left: 5px;
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
