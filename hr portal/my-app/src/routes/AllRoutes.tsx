import React from "react";
import { Routes, Route } from "react-router-dom";
import Users from "./Users";
import SingleUser from "./SingleUser";
import Adduser from "./AddUser";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/adduser" element={<Adduser />} />
      <Route path="/user/:id" element={<SingleUser />} />
    </Routes>
  );
}

export default AllRoutes;
