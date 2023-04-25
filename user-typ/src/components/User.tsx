import { ChangeEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text, Input, Button } from "@chakra-ui/react";
import Userdata from "./Userdata";
import { ContextApp } from "../context/AppContext";

function User() {
  let context = useContext(ContextApp);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/adduser");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value === ""
      ? context?.setData(context.users)
      : context?.setData(
          context?.data.filter((user) =>
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
      <Userdata data={context?.data} />
    </Box>
  );
}

export default User;
