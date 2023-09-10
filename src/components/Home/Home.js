import React, { Fragment } from "react";
import Navbar from "../NavBar/Navbar";
import ProductList from "../Product/ProductList";
import { Link } from "react-router-dom";
import Footer from "../Footer/footer";
import ProductHeader from "../Product/ProductHeader";

const Home = () => {
  return (
    <div>
      <Navbar>
        <Fragment>
          <ProductHeader />
          <ProductList></ProductList>
        </Fragment>
      </Navbar>
      <Footer />
      {/* <Link to="/admin">Admin</Link> */}
    </div>
  );
};

export default Home;
