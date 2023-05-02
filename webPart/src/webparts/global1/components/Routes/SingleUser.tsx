import * as React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserData, getData } from "../Context/AppContext";
import { sp } from "../Context/Auth";
import SingleUserData from "./SingleUserData";

function SingleUser() {
  const { id } = useParams();
  const navigate = useNavigate();
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
    setSingleUser({ ...singleUser, [key]: value });
  };

  const handleSave = async () => {
    const list = sp.web.lists.getByTitle("user");
    await list.items.getById(+id).update({
      name: singleUser.name,
      phone: singleUser.phone,
      email: singleUser.email,
      gender: singleUser.gender,
      city: singleUser.city,
    });
    setIsUpdate(false);
    getSingleUser();
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <div style={{ padding: 5, backgroundColor: "grey" }}>
        <h3>
          <Link to="/">User Managment</Link>
        </h3>
      </div>
      <div
        style={{
          padding: 5,
          marginLeft: "40%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          width={"10%"}
          style={{ margin: "auto" }}
          src="https://th.bing.com/th?id=OIP.Cl56H6WgxJ8npVqyhefTdQHaHa&w=249&h=249&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
        />
        {!isUpdate ? (
          <SingleUserData {...singleUser} />
        ) : (
          <div style={{ backgroundColor: "white" }}>
            <p>Name :</p>
            <input
              placeholder="Name"
              value={singleUser.name}
              onChange={handleChange}
              name="name"
              required
            />
            <p>Email :</p>
            <input
              placeholder="Email"
              type="email"
              value={singleUser.email}
              onChange={handleChange}
              name="email"
              required
            />
            <p>Gender :</p>
            <input
              placeholder="Gender"
              value={singleUser?.gender}
              onChange={handleChange}
              name="gender"
              required
            />
            <p>Phone No:</p>
            <input
              placeholder="Phone No"
              type="number"
              value={singleUser.phone}
              onChange={handleChange}
              name="phone"
              required
            />
            <p>City :</p>
            <input
              placeholder="City"
              value={singleUser.city}
              onChange={handleChange}
              name="city"
              required
            />
          </div>
        )}
        <button onClick={isUpdate ? handleCancel : handleDelete}>
          {isUpdate ? "Cancel" : "Delete"}
        </button>
        <button onClick={isUpdate ? handleSave : handleUpdate}>
          {isUpdate ? "Save" : "Update"}
        </button>
      </div>
    </div>
  );
}

export default SingleUser;
