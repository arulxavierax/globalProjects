import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Container,
  Divider,
  Heading,
  Image,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import "../App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonCardbody from "./PersonCardbody";

function Person() {
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleUpdate = () => {
    setIsUpdate(true);
  };

  const handleDelete = async () => {
    navigate("/");
  };

  const handleCancel = () => {
    setIsUpdate(false);
  };

  const handleSave = async () => {
    setIsUpdate(false);
  };

  return (
    <Card maxW="sm" className="singleUser">
      {!isUpdate ? (
        <PersonCardbody />
      ) : (
        <Container className="form">
          <Box fontSize={"3xl"} textAlign={"center"}>
            Update User
          </Box>
          <Image w={'30%'} m={'auto'} src='https://th.bing.com/th?id=OIP.Cl56H6WgxJ8npVqyhefTdQHaHa&w=249&h=249&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2' />
          <Input type="file"/>
          <Text>Name :</Text>
          <Input
            variant="filled"
            placeholder="Name"
            // value={form.name}
            // onChange={handleChange}
            name="name"
            required={true}
          />
          <Text>Email :</Text>
          <Input
            variant="filled"
            type="email"
            placeholder="Email"
            // value={form.email}
            // onChange={handleChange}
            name="email"
          />
          <Text>city :</Text>
          <Select
            placeholder="Select City"
            variant="filled"
            // onChange={handleChange}
            // value={form.city}
            name="city"
          >
            <option value="Thrissur">Thrissur</option>
            <option value="Kozhikode">Kozhikode</option>
            <option value="Malappuram">Malappuram</option>
            <option value="Ernakulam">Ernakulam</option>
            <option value="Alappuzha">Alappuzha</option>
            <option value="Palakkad">Palakkad</option>
          </Select>
          <Text>Gender :</Text>
          <RadioGroup>
            <Stack direction="row">
              <Radio name="gender" value="Male">
                Male
              </Radio>
              <Radio name="gender" value="Female">
                Female
              </Radio>
            </Stack>
          </RadioGroup>
          <Text>Phone No :</Text>
          <Input
            variant="filled"
            type="number"
            placeholder="Phone No"
            // value={form.phone}
            // onChange={handleChange}
            name="phone"
          />
        </Container>
      )}
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button
            onClick={isUpdate ? handleCancel : handleDelete}
            variant="solid"
            colorScheme="red"
          >
            {isUpdate ? "Cancel" : "Delete"}
          </Button>
          <Button
            onClick={isUpdate ? handleSave : handleUpdate}
            variant="ghost"
            colorScheme="blue"
          >
            {isUpdate ? "Save" : "Update"}
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export default Person;
