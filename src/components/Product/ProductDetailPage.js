import React, { Fragment } from "react";
import ProductDetail from "./ProductDetail";
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/footer";

const ProductDetailPage = () => {
  return (
    <Fragment>
      <Navbar>
        <ProductDetail />
      </Navbar>
      <Footer />
    </Fragment>
  );
};

export default ProductDetailPage;
