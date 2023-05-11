import { CardBody, Heading, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";

function PersonCardbody({ data }: any) {
  return (
    <CardBody>
      <Image
        sx={{ marginInline: "auto" }}
        src={
          data.imageUrl
            ? `https://2mxff3.sharepoint.com${data.imageUrl}`
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmCS3uMVc54NYJHXFUSIUFZrI3Zp00EZ6KcA&usqp=CAU"
        }
        alt={data.name}
        borderRadius="lg"
      />
      <Stack mt="6" spacing="3">
        <Heading size="md">{data.name}</Heading>
        <Text fontSize={"md"}>Email : {data.email}</Text>
        <Text fontSize={"md"}>Phone No. : {data.phone}</Text>
        <Text fontSize={"md"}>City : {data.city}</Text>
        <Text fontSize={"md"}>Gender : {data.gender}</Text>
      </Stack>
    </CardBody>
  );
}

export default PersonCardbody;
