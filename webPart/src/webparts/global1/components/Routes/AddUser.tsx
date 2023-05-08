import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
// import { ContextApp } from "../Context/AppContext";
import { sp } from "../Context/Auth";
import { getData } from "../Context/AppContext";

const initial = {
  Title: "",
  name: "",
  email: "",
  gender: "",
  phone: "",
  city: "",
};

// const context = React.useContext(ContextApp);
function AddUser() {
  const [form, setForm] = React.useState(initial);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: key, value } = e.target;
    setForm({ ...form, [key]: value, Title: "user" });
  };

  const handleSubmit = async () => {
    const postData = await sp.web.lists.getByTitle("user").items.add(form);
    setForm(initial);
    getData();
    await sp.web
      .getFolderByServerRelativePath("documentsLibrary")
      .addSubFolderUsingPath(`${postData.data.Id}`);
    navigate(`/user/${postData.data.Id}`);
  };

  const handleCancel = () => {
    setForm(initial);
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        height: "100%",
        overflowX: "scroll",
        overflowY: "scroll",
      }}
    >
      <div style={{ padding: 5, backgroundColor: "grey" }}>
        <h3>
          <Link to="/">User Managment</Link>
        </h3>
      </div>
      <div
        style={{ margin: 5, display: "flex", justifyContent: "space-between" }}
      >
        <div style={{ width: "40%" }}>
          <img
            style={{ margin: "auto" }}
            width={"20%"}
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
            placeholder="Gender"
            value={form.gender}
            onChange={handleChange}
            name="gender"
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
