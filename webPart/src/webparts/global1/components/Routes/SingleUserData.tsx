import * as React from "react";
import { UserData } from "../Context/AppContext";

function SingleUserData(singleUser: UserData) {
  return (
    <>
      <p>Name : {singleUser?.name}</p>
      <p>Email : {singleUser?.email}</p>
      <p>Gender : {singleUser?.gender}</p>
      <p>Phone No : {singleUser?.phone}</p>
      <p>City : {singleUser?.city}</p>
    </>
  );
}

export default SingleUserData;
