import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserData, getData } from "../Context/AppContext";
import { sp } from "../Context/Auth";

const initial = {
  Title: "",
  name: "",
  email: "",
  gender: "",
  phone: "",
  city: "",
};

function SingleUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = React.useState(initial);
  const [singleUser, setSingleUser] = React.useState<UserData>();
  const [isUpdate, setIsUpdate] = React.useState(false);

  const getSingleUser = async () => {
    let data = await sp.web.lists.getByTitle("user").items.getById(+id)();
    setSingleUser(data);
  };

  React.useEffect(() => {
    getSingleUser();
  }, [id]);

  const handleDelete = async () => {
    const list = sp.web.lists.getByTitle("user");
    await list.items.getById(+id).delete();
    getData();
    navigate("/");
  };

  const handleUpdate = () => {
    setIsUpdate(true);
  };

  const handleCancel = () => {
    setIsUpdate(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: key, value } = e.target;
    setForm({ ...form, [key]: value, Title: "user" });
  };

  const handleSave = async () => {
    const list = sp.web.lists.getByTitle("user");
    await list.items.getById(+id).update(form);
  };

  return (
    <div>
      <div style={{ padding: 5, backgroundColor: "grey" }}>
        <h3>User Managment</h3>
      </div>
      <div style={{ padding: 5 }}>
        <img
          width={"10%"}
          style={{ margin: "auto" }}
          src="https://th.bing.com/th?id=OIP.Cl56H6WgxJ8npVqyhefTdQHaHa&w=249&h=249&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
        />
        {!isUpdate ? (
          <>
            <p>Name : {singleUser?.name}</p>
            <p>Email : {singleUser?.email}</p>
            <p>Gender : {singleUser?.gender}</p>
            <p>Phone No : {singleUser?.phone}</p>
            <p>City : {singleUser?.city}</p>
          </>
        ) : (
          <div>
            <input
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              name="name"
              required={true}
            />
            <input
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={handleChange}
              name="email"
              required={true}
            />
            <input
              placeholder="Gender"
              value={form.gender}
              onChange={handleChange}
              name="gender"
              required={true}
            />
            <input
              placeholder="Phone No"
              type="number"
              value={form.phone}
              onChange={handleChange}
              name="phone"
              required={true}
            />
            <input
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              name="city"
              required={true}
            />
          </div>
        )}
      </div>
      <button onClick={isUpdate ? handleCancel : handleDelete}>
        {isUpdate ? "Cancel" : "Delete"}
      </button>
      <button onClick={isUpdate ? handleSave : handleUpdate}>
        {isUpdate ? "Save" : "Update"}
      </button>
    </div>
  );
}

export default SingleUser;
