import * as React from "react";
import { useNavigate } from "react-router-dom";
import UserData from "./UserData";
import { ContextApp } from "../Context/AppContext";

function User() {
  let context = React.useContext(ContextApp);
  const [searchData, setSearchData] = React.useState([]);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/adduser");
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(
      context?.data.filter((user) =>
        user.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <div
      style={{
        overflowX: "scroll",
        overflowY: "scroll",
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <div style={{ padding: 5, background: "grey" }}>
        <h3>User Managment</h3>
      </div>
      <div
        style={{
          marginTop: 5,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ paddingLeft: 5 }}>
          <input onChange={handleChange} placeholder="Search" />
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
      <UserData data={searchData[0] ? searchData : context?.data} />
    </div>
  );
}

export default User;
