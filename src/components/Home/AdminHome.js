import React from "react";
import Navbar from "../NavBar/Navbar";
import AdminProductList from "../../features/admin/AdminProductList";

const AdminHome = () => {
  return (
    <div>
      <Navbar>
        <AdminProductList></AdminProductList>
      </Navbar>
    </div>
  );
};

export default AdminHome;
