import React from "react";
import Navbar from "./../NavBar/Navbar";
import ProductForm from "../../features/admin/ProductForm";

const AdminProductFormPage = () => {
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <ProductForm></ProductForm>
    </React.Fragment>
  );
};

export default AdminProductFormPage;
