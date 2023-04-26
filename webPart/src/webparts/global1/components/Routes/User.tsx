import * as React from "react";
import { useNavigate } from "react-router-dom";
import UserData from "./UserData";
import { ContextApp } from "../Context/AppContext";


function User() {
      let context = React.useContext(ContextApp);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/adduser");
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.target.value === ""
        ? context?.setData(context.users)
        : context?.setData(
            context?.data.filter((user) =>
              user.name.toLowerCase().includes(e.target.value.toLowerCase())
            )
          );
  };

  return (
    <div>
      <div style={{ padding: 5, background: "grey" }}>
        <p>User Managment</p>
      </div>
      <div
        style={{
          marginTop: 5,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ paddingLeft: 5 }}>
          <input onChange={(e) => handleChange(e)} placeholder="Search" />
        </div>
        <div style={{ paddingRight: 5 }}>
          <button
            onClick={handleClick}
            style={{
              backgroundColor: "grey",
              padding: 5,
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            Add User
          </button>
        </div>
      </div>
      <UserData data={context?.data} />
    </div>
  );
}

export default User;
