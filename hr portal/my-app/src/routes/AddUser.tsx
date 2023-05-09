import React, { useState } from "react";
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
} from "@chakra-ui/react";
import "../App.css";

const initial = {
  Title: "",
  name: "",
  email: "",
  gender: "",
  phone: "",
  city: "",
};

function Adduser() {
  const [form, setForm] = useState(initial);

  const handleChange = (e: any) => {
    const { name: key, value } = e.target;
    setForm({ ...form, [key]: value, Title: "user" });
  };

  const handleCancel = () => {
    setForm(initial);
  };

  const handleRadio = (e: any) => {
    console.log(e.target.value);
  };

  const handleSubmit = () => {
    console.log(form);
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
        <option value="Thrissur">Thrissur</option>
        <option value="Kozhikode">Kozhikode</option>
        <option value="Malappuram">Malappuram</option>
        <option value="Ernakulam">Ernakulam</option>
        <option value="Alappuzha">Alappuzha</option>
        <option value="Palakkad">Palakkad</option>
      </Select>
      <Text>Gender :</Text>
      <RadioGroup>
        <Stack direction="row" onChange={handleRadio}>
          <Radio value="Male">Male</Radio>
          <Radio value="Female">Female</Radio>
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
