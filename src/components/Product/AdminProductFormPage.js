import React from 'react';
import Navbar from './../NavBar/Navbar';
import ProductForm from '../../features/admin/ProductForm';

const AdminProductFormPage = () => {
  return (
    <Navbar>
        <ProductForm></ProductForm>
    </Navbar>
  )
}

export default AdminProductFormPage;