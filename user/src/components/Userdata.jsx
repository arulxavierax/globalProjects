import { Box, Button, Image, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { data } from "./data"

function Userdata({ data }) {
 

  return (
    <Box p={5}>
      <SimpleGrid columns={[2, 2, 4]} spacing={10}>
        {data?.map((e) => (
          <Box key={e.id} border={"1px solid black"} borderRadius={10} p={5}>
            <Link to={`/user/${e.id}`}>
              <Image
                width={"50%"}
                margin={"auto"}
                src="https://th.bing.com/th?id=OIP.Cl56H6WgxJ8npVqyhefTdQHaHa&w=249&h=249&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
              />
              <Text>Name : {e.name}</Text>
              <Text>Designation : {e.designation}</Text>
              <Text>Department : {e.department}</Text>
              <Text>Email : {e.email}</Text>
              <Text>Dob : {e.dob}</Text>
              <Text>Gender : {e.gender}</Text>
              <Text>Phone : {e.phone}</Text>
              <Text>Language : {e.language}</Text>
              <Text>City : {e.city}</Text>
            </Link>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default Userdata;
