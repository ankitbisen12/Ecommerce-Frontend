import React from "react";
import Navbar from "../NavBar/Navbar";
import AdminProductList from "../../features/admin/AdminProductList";

const AdminHome = () => {
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <AdminProductList></AdminProductList>
    </React.Fragment>
  );
};

export default AdminHome;
