import * as React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function UserData({ data }: any) {
  return (
    <div style={{ padding: 5 }}>
      <div className="girdContainer">
        {data?.map((e: any) => (
          <div
            key={e.id}
            style={{
              border: "1px solid black",
              borderRadius: 10,
              padding: 5,
              marginTop: "5px",
            }}
          >
            <Link to={`/user/${e.Id}`}>
              <img
                width={"20%"}
                style={{ margin: "auto" }}
                src="https://th.bing.com/th?id=OIP.Cl56H6WgxJ8npVqyhefTdQHaHa&w=249&h=249&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
              />
              <p>Name : {e.name}</p>
              <p>Email : {e.email}</p>
              {/* <p>Gender : {e.gender}</p>
              <p>Phone : {e.phone}</p>
              <p>City : {e.city}</p> */}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserData;
