import React from "react";
import AdminOrders from "../features/admin/AdminOrders";
import Navbar from "./NavBar/Navbar";

const AdminOrderPage = () => {
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <AdminOrders />
    </React.Fragment>
  );
};

export default AdminOrderPage;
