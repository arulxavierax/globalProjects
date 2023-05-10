import { Box, Container, Input } from "@chakra-ui/react";
import React, { ChangeEvent } from "react";

function Users() {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <Box>
      <Container>
        <Input placeholder="Search a User" onChange={handleSearch} />
      </Container>
    </Box>
  );
}

export default Users;
