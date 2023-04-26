import * as React from "react";
import { Link } from "react-router-dom";
import "../Styles/Style.css";

function UserData({ data }: any) {
  return (
    <div style={{ padding: 5 }}>
      <div className="grid">
        {data?.map((e: any) => (
          <div
            key={e.id}
            style={{ border: "1px solid black", borderRadius: 10, padding: 5 }}
          >
            <Link to={`/user/${e.id}`}>
              <img
                width={"50%"}
                style={{ margin: "auto" }}
                src="https://th.bing.com/th?id=OIP.Cl56H6WgxJ8npVqyhefTdQHaHa&w=249&h=249&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
              />
              <p>Name : {e.name}</p>
              <p>Designation : {e.designation}</p>
              <p>Department : {e.department}</p>
              <p>Email : {e.email}</p>
              <p>Dob : {e.dob}</p>
              <p>Gender : {e.gender}</p>
              <p>Phone : {e.phone}</p>
              <p>Language : {e.language}</p>
              <p>City : {e.city}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserData;
