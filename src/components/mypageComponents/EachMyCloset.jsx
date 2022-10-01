import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const EachMyCloset = ({ item, click }) => {
  const navigate = useNavigate();

  return (
    <Closet
      alt="closet_img"
      src={item?.imgUrl}
      onError={(e) =>
        (e.target.src = `${item.imgUrl.split("w280")[0]}post${
          item.imgUrl.split("w280")[1]
        }`)
      }
      onClick={() => {
        if (click) {
          navigate(`/item_detail/${item.postId}/${item.userId}`);
        }
      }}
    ></Closet>
  );
};

const Closet = styled.img`
  width: 160px;
  height: 190px;
  margin: 10px;
  border-radius: 10px;
  flex-shrink: 0;
  cursor: pointer;
`;

export default EachMyCloset;
