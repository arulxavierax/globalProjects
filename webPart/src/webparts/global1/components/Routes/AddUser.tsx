import * as React from "react";
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
  const context = React.useContext(ContextApp);
  const [form, setForm] = React.useState(initial);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: key, value } = e.target;
    setForm({ ...form, [key]: value, id: Date.now() + form.name });
  };

  const handleSubmit = () => {
    context?.data.push(form);
    localStorage.setItem("user", JSON.stringify(context?.data));
    setForm(initial);
    navigate("/");
  };

  const handleCancel = () => {
    setForm(initial);
  };

  return (
    <div>
      <div style={{ padding: 5, backgroundColor: "grey" }}>
        <p>User Managment</p>
      </div>
      <div
        style={{ margin: 5, display: "flex", justifyContent: "space-between" }}
      >
        <div style={{ width: "40%" }}>
          <img
            style={{ margin: "auto" }}
            width={"50%"}
            src="https://th.bing.com/th?id=OIP.Cl56H6WgxJ8npVqyhefTdQHaHa&w=249&h=249&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
          />
          <input
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            name="name"
            required={true}
          />
        </div>
        <div style={{ width: "40%" }}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            name="email"
          />
          <input
            placeholder="DOB"
            value={form.dob}
            onChange={handleChange}
            name="dob"
          />
          <input
            placeholder="Gender"
            value={form.gender}
            onChange={handleChange}
            name="gender"
          />
          <input
            placeholder="Designation"
            value={form.designation}
            onChange={handleChange}
            name="designation"
          />
          <input
            type="number"
            placeholder="Phone No"
            value={form.phone}
            onChange={handleChange}
            name="phone"
          />
          <input
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            name="city"
          />
          <input
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
            name="department"
          />
          <input
            placeholder="Language"
            value={form.language}
            onChange={handleChange}
            name="language"
          />
          <div style={{ justifyContent: "space-between" }}>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
