import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sp } from "../Context/Auth";
import { UserData, getData } from "../Context/AppContext";
import SingleUserData from "./SingleUserData";

function Person() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [singleUser, setSingleUser] = React.useState<UserData>();
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [image, setImage] = React.useState<any>("");
  const fileNamePath = encodeURI(image.name);

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
    if (image !== "") {
      let c = await sp.web
        .getFolderByServerRelativePath(`documentsLibrary/${id}`)
        .files.addUsingPath(fileNamePath, image, { Overwrite: true });
      await list.items.getById(+id).update({
        imageUrl: c.data.ServerRelativeUrl,
      });
    }
    setIsUpdate(false);
    getSingleUser();
  };

  const handleFile = (e: any) => {
    setImage(e.target.files[0]);
  };
  return (
    <div
      style={{
        padding: 5,
        marginLeft: "40%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        width={"30%"}
        style={{ margin: "auto", borderRadius: "50%" }}
        src={
          singleUser?.imageUrl
            ? singleUser.imageUrl
            : "https://th.bing.com/th?id=OIP.Cl56H6WgxJ8npVqyhefTdQHaHa&w=249&h=249&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
        }
      />
      {!isUpdate ? (
        <SingleUserData {...singleUser} />
      ) : (
        <div style={{ backgroundColor: "white" }}>
          <input type="file" onChange={handleFile} />
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
  );
}

export default Person;
