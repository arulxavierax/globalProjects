import { Box, Button, Image, Input, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SingleUser() {
  const { id } = useParams();
  const [singleUser, setSingleUser] = useState({});
  const allUsers = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    allUsers.filter((e) => (e.id === id ? setSingleUser(e) : ""));
  }, [id]);

  

  return (
    <Box>
      <Box p={5} bg={"grey"}>
        <Text fontSize={"lg"}>User Managment</Text>
      </Box>
      <Box p={5}>
        <Image
          width={"10%"}
          margin={"auto"}
          src="https://th.bing.com/th?id=OIP.Cl56H6WgxJ8npVqyhefTdQHaHa&w=249&h=249&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
        />
        <Text align={"center"}>Name : {singleUser.name}</Text>
        <Text align={"center"}>Department : {singleUser.department}</Text>
        <Text align={"center"}>Designation : {singleUser.designation}</Text>
        <Text align={"center"}>Email : {singleUser.email}</Text>
        <Text align={"center"}>DOB : {singleUser.dob}</Text>
        <Text align={"center"}>Gender : {singleUser.gender}</Text>
        <Text align={"center"}>Phone No : {singleUser.phone}</Text>
        <Text align={"center"}>Language : {singleUser.language}</Text>
        <Text align={"center"}>City : {singleUser.city}</Text>
      </Box>
    </Box>
  );
}

export default SingleUser;
