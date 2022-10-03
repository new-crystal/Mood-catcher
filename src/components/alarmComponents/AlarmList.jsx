import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
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
      {alarm.postId === -1 ? (
        <AlarmBox key={alarm.noticeId}>
          <AlarmImg url={alarm.imgUrl}> </AlarmImg>
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
    width: 260px;
    margin-left: 5px;
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
const TextBox = styled.div`
  width: 255px;
  margin: 0px;
`;
const TimeText = styled.div`
  width: 45px;
  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 0.188rem;
  position: relative;
  top: -19px;
  left: 0px;
  text-align: center;
  margin-right: 0px;
  flex-shrink: 0;
`;

const AlarmImg = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  margin-left: 5px;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});
  flex-shrink: 0;
`;

const ArrowBtn = styled.div`
  transform: scaleX(-1);
  width: 15px;
  height: 15px;
  background-position: center;
  background-size: cover;
  background-image: url("https://www.pngmart.com/files/16/Left-Arrow-Icon-PNG-Transparent-Image.png");
  position: relative;
  left: -30px;
  top: 10px;
  opacity: 70%;
  flex-shrink: 0;
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
