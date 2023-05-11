import { Box, Container, Input } from "@chakra-ui/react";
import React, { ChangeEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "../store/users/users.action";

function Users() {
  const dispatch = useDispatch();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <Box>
      <Container>
        <Input placeholder="Search a User" onChange={handleSearch} />
      </Container>
    </Box>
  );
}

export default Users;
