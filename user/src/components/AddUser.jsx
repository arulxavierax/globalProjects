import { Box, Button, Image, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ContextApp } from "../Context/AppContext";

const initial = {
  name: "",
  email: "",
  dob: "",
  gender: "",
  designation: "",
  phone: "",
  city: "",
  department: "",
  language: "",
  id: "",
};

function AddUser() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const {data, setData} = useContext(ContextApp)

  const handleChange = (e) => {
    const { name: key, value } = e.target;
    setForm({ ...form, [key]: value, id: Date.now() + form.name });
  };

  const handleSubmit = () => {
   setData([...data,form]);
    localStorage.setItem("user", JSON.stringify(data));
    setForm(initial);
    navigate("/");
  };

  const handleCancel = () => {
    setForm(initial);
  };

  return (
    <Box>
      <Box p={5} bg={"grey"}>
        <Text fontSize={"lg"}>User Managment</Text>
      </Box>
      <Box margin={5} display={"flex"} justifyContent={"space-between"}>
        <Box width={"40%"}>
          <Image
            margin={"auto"}
            width={"50%"}
            src="https://th.bing.com/th?id=OIP.Cl56H6WgxJ8npVqyhefTdQHaHa&w=249&h=249&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
          />
          <Input
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            name="name"
          />
        </Box>
        <Box width={"40%"}>
          <Input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            name="email"
          />
          <Input
            placeholder="DOB"
            value={form.dob}
            onChange={handleChange}
            name="dob"
          />
          <Input
            placeholder="Gender"
            value={form.gender}
            onChange={handleChange}
            name="gender"
          />
          <Input
            placeholder="Designation"
            value={form.designation}
            onChange={handleChange}
            name="designation"
          />
          <Input
            type="number"
            placeholder="Phone No"
            value={form.phone}
            onChange={handleChange}
            name="phone"
          />
          <Input
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            name="city"
          />
          <Input
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
            name="department"
          />
          <Input
            placeholder="Language"
            value={form.language}
            onChange={handleChange}
            name="language"
          />
          <Box justifyContent={"space-between"}>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleSubmit}>Save</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AddUser;
