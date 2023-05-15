import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Center,
  Container,
  Divider,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Select,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import "../App.css";
import { Dispatch, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PersonCardbody from "./PersonCardbody";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../store/store";
import {
  deleteUser,
  getSingleUsers,
} from "../store/singleUser/singleUser.action";

const initial = {
  Title: "",
  name: "",
  email: "",
  gender: "",
  phone: "",
  city: "",
};

function Person() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [form, setForm] = useState(initial);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, error, loading } = useSelector(
    (store: RootState) => store.singleUser
  );
  const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;

  useEffect(() => {
    dispatchStore(getSingleUsers(id));
    // setForm(data);
  }, [id]);

  if (loading) {
    return (
      <Center h="300px">
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

  const handleUpdate = () => {
    setIsUpdate(true);
  };

  const handleDelete = async () => {
    dispatchStore(deleteUser(id)).then((res: any) => {
      toast({
        title: "User Deleted",
        status: "error",
        isClosable: true,
      });
    });
    onClose();
    navigate("/");
  };

  const handleChange = (e: any) => {
    const { name: key, value } = e.target;
    setForm({ ...form, [key]: value, Title: "user" });
  };

  const handleCancel = () => {
    setIsUpdate(false);
  };

  const handleSave = async () => {
    console.log(form);
    setIsUpdate(false);
  };

  return (
    <Card maxW="sm" className="singleUser">
      {!isUpdate ? (
        <PersonCardbody data={data} loading={loading} />
      ) : (
        <Container className="form">
          <Box fontSize={"3xl"} textAlign={"center"}>
            Update User
          </Box>
          <Image
            w={"30%"}
            m={"auto"}
            src="https://th.bing.com/th?id=OIP.Cl56H6WgxJ8npVqyhefTdQHaHa&w=249&h=249&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
          />
          <Input type="file" />
          <Text>Name :</Text>
          <Input
            variant="filled"
            placeholder="Name"
            defaultValue={data.name}
            onChange={handleChange}
            name="name"
            required={true}
          />
          <Text>Email :</Text>
          <Input
            variant="filled"
            type="email"
            placeholder="Email"
            defaultValue={data.email}
            onChange={handleChange}
            name="email"
          />
          <Text>city :</Text>
          <Select
            variant="filled"
            onChange={handleChange}
            // defaultValue={data.city}
            name="city"
          >
            <option value={data.city ? data.city : ""}>
              {data.city ? data.city : "Selsct your city"}
            </option>
            <option value="Thrissur">Thrissur</option>
            <option value="Kozhikode">Kozhikode</option>
            <option value="Malappuram">Malappuram</option>
            <option value="Ernakulam">Ernakulam</option>
            <option value="Alappuzha">Alappuzha</option>
            <option value="Palakkad">Palakkad</option>
          </Select>
          <Text>Gender :</Text>
          <RadioGroup defaultValue={data.gender}>
            <Stack direction="row" onChange={handleChange}>
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
            defaultValue={data.phone}
            onChange={handleChange}
            name="phone"
          />
        </Container>
      )}
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button onClick={isUpdate ? handleCancel : onOpen}>
            {isUpdate ? (
              "Cancel"
            ) : (
              <>
                <Button variant="ghost" colorScheme="red">
                  Delete
                </Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>User Delete</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>Are you sure ?</ModalBody>

                    <ModalFooter>
                      <Button onClick={onClose}>Close</Button>
                      <Button
                        onClick={handleDelete}
                        colorScheme="red"
                        mr={3}
                      >
                        Delete
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </>
            )}
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
