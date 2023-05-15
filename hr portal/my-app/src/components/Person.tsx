import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardFooter,
  Center,
  Container,
  Divider,
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
import { useSelector } from "react-redux";
import { RootState, store } from "../store/store";
import {
  deleteUser,
  getSingleUsers,
  updateSingleUser,
} from "../store/singleUser/singleUser.action";

type User = {
  city: string;
  email: string;
  gender: string;
  name: string;
  phone: string;
  Title: string;
};

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
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [isPic, setIsPic] = useState<any>("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, error, loading } = useSelector(
    (store: RootState) => store.singleUser
  );
  const [form, setForm] = useState<any>(initial);
  const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;

  const formdata = new FormData();
  formdata.append("photo", isPic);
  formdata.append("data", JSON.stringify(form));

  useEffect(() => {
    dispatchStore(getSingleUsers(id)).then((res: any) => {
      setForm(res);
    });
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
    setForm((prevState: any) => ({
      ...prevState,
      [key]: value,
      Title: "user",
    }));
  };

  const handlePic = (e: any) => {
    setIsPic(e.target.files[0]);
  };

  const handleCancel = () => {
    setIsUpdate(false);
  };

  const handleSave = async () => {
    dispatchStore(updateSingleUser(id, formdata, setIsUpdate));
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
            m={"auto"}
            borderRadius="full"
            src={
              data.imageUrl
                ? `https://2mxff3.sharepoint.com${data.imageUrl}`
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmCS3uMVc54NYJHXFUSIUFZrI3Zp00EZ6KcA&usqp=CAU"
            }
          />
          <form
            name="uploader"
            action="/fileupload"
            method="post"
            encType="multipart/form-data"
          >
            <Input type="file" name="photo" onChange={handlePic} />
          </form>
          <Text>Name :</Text>
          <Input
            variant="filled"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            name="name"
            required={true}
          />
          <Text>Email :</Text>
          <Input
            variant="filled"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            name="email"
          />
          <Text>city :</Text>
          <Select variant="filled" onChange={handleChange} name="city">
            <option value={form.city ? form.city : ""}>
              {form.city ? form.city : "Select your city"}
            </option>
            <option value="Thrissur">Thrissur</option>
            <option value="Kozhikode">Kozhikode</option>
            <option value="Malappuram">Malappuram</option>
            <option value="Ernakulam">Ernakulam</option>
            <option value="Alappuzha">Alappuzha</option>
            <option value="Palakkad">Palakkad</option>
          </Select>
          <Text>Gender :</Text>
          <RadioGroup value={form.gender}>
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
            value={form.phone}
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
                      <Button onClick={handleDelete} colorScheme="red" mr={3}>
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
