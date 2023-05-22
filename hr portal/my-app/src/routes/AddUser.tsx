import React, { Dispatch, useEffect, useState } from "react";
import {
  Container,
  Box,
  Input,
  Text,
  RadioGroup,
  Stack,
  Radio,
  Select,
  Button,
  useToast,
} from "@chakra-ui/react";
import "../App.css";
import { RootState, store } from "../store/store";
import { addUser } from "../store/users/users.action";
import { useNavigate } from "react-router-dom";
import { getCities } from "../store/cities/cities.action";
import { useSelector } from "react-redux";

interface Icity {
  _id: string;
  name: string;
}

const initial = {
  Title: "",
  name: "",
  email: "",
  gender: "",
  phone: "",
  city: "",
};

function Adduser() {
  const toast = useToast();
  const [form, setForm] = useState(initial);
  const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;
  const navigate = useNavigate();

  const { data, error, loading } = useSelector(
    (store: RootState) => store.cities
  );

  useEffect(() => {
    dispatchStore(getCities());
  }, []);

  const handleChange = (e: any) => {
    const { name: key, value } = e.target;
    setForm({ ...form, [key]: value, Title: "user" });
  };

  const handleSubmit = () => {
    dispatchStore(addUser(form)).then((res: any) => {
      toast({
        title: "Account created.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      navigate(`/user/${res.Id}`);
    });
  };

  const handleCancel = () => {
    setForm(initial);
  };

  return (
    <Container className="form">
      <Box fontSize={"3xl"} textAlign={"center"}>
        Registration Form
      </Box>
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

      <Select
        placeholder="Select City"
        variant="filled"
        onChange={handleChange}
        value={form.city}
        name="city"
      >
        {data?.map((e: Icity) => (
          <option key={e._id} value={e.name}>
            {e.name}
          </option>
        ))}
      </Select>
      <Text>Gender :</Text>
      <RadioGroup>
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
      <Button onClick={handleCancel}>Cancel</Button>
      <Button onClick={handleSubmit}>submit</Button>
    </Container>
  );
}

export default Adduser;
