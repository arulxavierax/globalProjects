import * as React from "react";
import { Routes, Route } from "react-router-dom";
import User from "./User";
import AddUser from "./AddUser";
// import SingleUser from "./SingleUser";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<User />} />
      <Route path="/adduser" element={<AddUser />} />
      {/* <Route path="/user/:id" element={<SingleUser />} /> */}
    </Routes>
  );
}

export default AllRoutes;
