import * as React from "react";
import { useParams } from "react-router-dom";
import { ContextApp, UserData } from "../Context/AppContext";

function SingleUser() {
  const { id } = useParams();
  const [singleUser, setSingleUser] = React.useState<UserData>();
  let context = React.useContext(ContextApp);

  React.useEffect(() => {
    context?.data.filter((e) => (e.id === id ? setSingleUser(e) : ""));
  }, [id]);

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
        <p>Name : {singleUser?.name}</p>
        <p>Email : {singleUser?.email}</p>
        <p>Gender : {singleUser?.gender}</p>
        <p>Phone No : {singleUser?.phone}</p>
        <p>City : {singleUser?.city}</p>
      </div>
    </div>
  );
}

export default SingleUser;
