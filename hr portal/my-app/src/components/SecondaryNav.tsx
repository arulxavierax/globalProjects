import React from "react";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { Box, Container, Flex, Image, Text } from "@chakra-ui/react";
import "../App.css";

function SecondaryNav() {
  const { data, error, loading } = useSelector(
    (store: RootState) => store.singleUser
  );

  if (loading) {
    return <>...........</>;
  }

  return (
    <Box className="secondarynav">
      <Image
        w={"50%"}
        m={"auto"}
        borderRadius="full"
        src={
          data.imageUrl
            ? `https://2mxff3.sharepoint.com${data.imageUrl}`
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmCS3uMVc54NYJHXFUSIUFZrI3Zp00EZ6KcA&usqp=CAU"
        }
      />
      <Box>
        <Text as={"b"}>{data.name}</Text>
        <Text fontSize={"sm"}>{data.email}</Text>
      </Box>
    </Box>
  );
}

export default SecondaryNav;
