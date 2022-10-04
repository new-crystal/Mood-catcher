import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

//통신
import { __deleteAlarm } from "../../redux/async/alarm";

const AlarmListForm = ({ alarm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //알림 개별삭제
  const delAlarm = () => {
    Swal.fire({
      title: "알림을 삭제하시겠습니까?",
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
          "캐처님의 알람이 삭제되었습니다",
          "success"
        );
        dispatch(__deleteAlarm(alarm.noticeId));
      }
    });
  };

  return (
    <>
      {/* 알림의 이동페이지가 없는 경우 */}
      {alarm.postId === -1 ? (
        <AlarmBox key={alarm.noticeId}>
          <AlarmImg style={{ backgroundImage: `url(${alarm.imgUrl})` }}>
            <img
              src={`${alarm.imgUrl}`}
              alt="alarm_img"
              width="0"
              height="0"
              style={{ display: "none !important" }}
            />
          </AlarmImg>
          <TextBox>
            <p>{alarm.msg}</p>
          </TextBox>
          <TimeText>{alarm.createdAt}</TimeText>
          <DelAlarm style={{ cursor: "pointer" }} onClick={delAlarm}>
            ✕
          </DelAlarm>
        </AlarmBox>
      ) : (
        <AlarmBox
          key={alarm.noticeId}
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate(`/item_detail/${alarm.postId}/${alarm.userId}`);
          }}
        >
          <AlarmImg style={{ backgroundImage: `url(${alarm.imgUrl})` }}>
            <img
              src={`${alarm.imgUrl}`}
              alt="alarm_img"
              width="0"
              height="0"
              style={{ display: "none !important" }}
            />
          </AlarmImg>
          <TextBox>
            {alarm.duplecation > 1 && (
              <p>
                {alarm.msg}({alarm.duplecation})
              </p>
            )}
            {alarm.duplecation === 1 && <p>{alarm.msg}</p>}
          </TextBox>
          <TimeText>{alarm.createdAt}</TimeText>
          <ArrowBtn
            style={{
              backgroundImage: `url("https://www.pngmart.com/files/16/Left-Arrow-Icon-PNG-Transparent-Image.png")`,
            }}
          >
            <img
              src={`${"https://www.pngmart.com/files/16/Left-Arrow-Icon-PNG-Transparent-Image.png"}`}
              alt="arrow_img"
              width="0"
              height="0"
              style={{ display: "none !important" }}
            />
          </ArrowBtn>
          <DelAlarm2
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              Swal.fire({
                title: "알림을 삭제하시겠습니까?",
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
                    "캐처님의 알람이 삭제되었습니다",
                    "success"
                  );
                  dispatch(__deleteAlarm(alarm.noticeId));
                }
              });
            }}
          >
            ✕
          </DelAlarm2>
        </AlarmBox>
      )}
    </>
  );
};

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
    margin-left: 5px;
    width: 260px;
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
  margin: 0px;
  width: 255px;
`;
const TimeText = styled.div`
  position: relative;
  top: -19px;
  left: 0px;
  margin-right: 0px;
  width: 45px;
  font-style: normal;
  font-weight: 500;
  font-size: 0.188rem;
  text-align: center;
  flex-shrink: 0;
`;

const AlarmImg = styled.div`
  margin-left: 5px;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  background-position: center;
  background-size: cover;
  flex-shrink: 0;
`;

const ArrowBtn = styled.div`
  position: relative;
  left: -30px;
  top: 10px;
  width: 15px;
  height: 15px;
  background-position: center;
  background-size: cover;
  opacity: 70%;
  flex-shrink: 0;
  transform: scaleX(-1);
`;

const DelAlarm = styled.p`
  position: relative;
  left: -5px;
`;

const DelAlarm2 = styled.p`
  position: relative;
  left: -20px;
`;
export default AlarmListForm;
