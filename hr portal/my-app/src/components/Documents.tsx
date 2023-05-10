import { Box, Button, Container, Input } from "@chakra-ui/react";
import React from "react";

function Documents() {
  return (
    <Box>
      <Container>
        <Input type="file" />
        <Button>Submit</Button>
      </Container>
    </Box>
  );
}

export default Documents;
