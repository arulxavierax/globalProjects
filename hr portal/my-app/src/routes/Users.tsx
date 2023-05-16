import {
  Box,
  Card,
  CardBody,
  Center,
  Container,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import  { ChangeEvent, Dispatch, useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { getUsers, searchUsersData } from "../store/users/users.action";
import { RootState, store } from "../store/store";
import { Link } from "react-router-dom";
import "../App.css";
import { User } from "../components/Person";

function Users() {
  const { data, searchData, error, loading } = useSelector(
    (store: RootState) => store.users
  );
  const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;

  useEffect(() => {
    dispatchStore(getUsers());
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatchStore(searchUsersData(e.target.value, data));
  };
  if (loading) {
    return (
      <Center h="400px">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  }

  return (
    <Box>
      <Container>
        <Input placeholder="Search a User" onChange={handleSearch} />
      </Container>
      <Box>
        <SimpleGrid mt={5} columns={[1, 2, 4]} spacing={5}>
          {searchData?.map((e: User) => (
            <Link key={e.Id} to={`/user/${e.Id}`}>
              <Card maxW="sm">
                <CardBody>
                  <Image
                    className="image"
                    src={
                      e.imageUrl
                        ? `https://2mxff3.sharepoint.com${e.imageUrl}`
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmCS3uMVc54NYJHXFUSIUFZrI3Zp00EZ6KcA&usqp=CAU"
                    }
                    alt={e.name}
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">{e.name}</Heading>
                    <Text fontSize={"md"}>Email : {e.email}</Text>
                  </Stack>
                </CardBody>
              </Card>
            </Link>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default Users;
