import { Box, Button, Input, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import Userdata from "./Userdata";
import { useNavigate } from "react-router-dom";
import { ContextApp } from "../Context/AppContext";

function User() {
  let { data, setData, users } = useContext(ContextApp);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/adduser");
  };

  const handleChange = (e) => {
    e.target.value === ""
      ? setData(users)
      : setData(
          data.filter((user) =>
            user.name.toLowerCase().includes(e.target.value.toLowerCase())
          )
        );
  };

  return (
    <Box>
      <Box p={5} bg={"grey"}>
        <Text fontSize={"lg"}>User Managment</Text>
      </Box>
      <Box marginTop={"5"} display={"flex"} justifyContent={"space-between"}>
        <Box paddingLeft={"5"}>
          <Input onChange={(e) => handleChange(e)} placeholder="Search" />
        </Box>
        <Box paddingRight={"5"}>
          <Button
            onClick={handleClick}
            bg={"grey"}
            p={5}
            paddingLeft={10}
            paddingRight={10}
          >
            Add User
          </Button>
        </Box>
      </Box>
      <Userdata data={data} />
    </Box>
  );
}

export default User;
