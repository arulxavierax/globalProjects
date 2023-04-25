import React from "react";
import { Route, Routes } from "react-router-dom";
import User from "../components/User";
import AddUser from "../components/AddUser";
import SingleUser from "../components/SingleUser";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<User />} />
      <Route path="/adduser" element={<AddUser />} />
      <Route path="/user/:id" element={<SingleUser />} />
    </Routes>
  );
}

export default AllRoutes;
