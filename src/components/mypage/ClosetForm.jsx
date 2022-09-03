import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { __getCloset } from "../../redux/modules/uploadSlice";
import LikeClosetForm from "./LikeClosetForm";

const ClosetForm = () => {
  const dispatch = useDispatch();
  //closetList 받아와서 뿌려주기!!
  const closetList = useSelector((state) => state);

  //userId, page, count 보내주기!!
  useEffect(() => {
    dispatch(__getCloset());
  }, []);

  return (
    <Container>
      <ClosetHeader>
        <h1>My Closet</h1>
      </ClosetHeader>
      <LikeClosetForm />
    </Container>
  );
};
const Container = styled.div`
  width: 428px;
  height: 926px;
`;
const ClosetHeader = styled.div`
  width: 428px;
  height: 50px;
  background-color: #a396c9;
  color: white;
`;

export default ClosetForm;
