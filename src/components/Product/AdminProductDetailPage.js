import React from "react";
import Navbar from "../NavBar/Navbar";
import AdminProductDetail from "../../features/admin/AdminProductDetail";

const AdminProductDetailPage = () => {
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <AdminProductDetail></AdminProductDetail>
    </React.Fragment>
  );
};

export default AdminProductDetailPage;
