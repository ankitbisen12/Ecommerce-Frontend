import React, { Fragment } from "react";
import ProductDetail from "./ProductDetail";
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/footer";

const ProductDetailPage = () => {
  return (
    <React.Fragment>
      <Navbar>
      </Navbar>
        <ProductDetail />
      <Footer />
    </React.Fragment>
  );
};

export default ProductDetailPage;
