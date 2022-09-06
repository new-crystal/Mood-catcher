import styled from "styled-components";
import { useRef } from "react";
import { Fragment } from "react";

const SearchForm = () => {
  const searchRef = useRef();

  return (
    <Fragment>
      <Container>
        <ClosetHeader>
          <h1>Search</h1>
        </ClosetHeader>

        <SearchInput type="search" ref={searchRef} />
        <ClosetBox>
          <h1>Other Closet</h1>
        </ClosetBox>
      </Container>
    </Fragment>
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
const SearchInput = styled.input`
  background-color: white;
  width: 350px;
  height: 50px;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin: 10px 30px;
`;
const ClosetBox = styled.div`
  width: 200px;
  height: 40px;
  border-radius: 10px;
  background-color: #7b758b;
  color: white;
`;

export default SearchForm;
