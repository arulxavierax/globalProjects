import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import "../App.css";

function Navbar() {
  return (
    <Box className="nav">
      <Box>
        <Link to="/">
          <Text fontSize={"2xl"} as={"b"}>
            Hr Portal
          </Text>
        </Link>
      </Box>
      <Link to="/adduser">
        <Button leftIcon={<AddIcon />} colorScheme="facebook">
          Add User
        </Button>
      </Link>
    </Box>
  );
}

export default Navbar;
