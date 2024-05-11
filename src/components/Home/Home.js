import React, { Fragment } from "react";
import Navbar from "../NavBar/Navbar";
import ProductList from "../Product/ProductList";
import Footer from "../Footer/footer";
// import ProductHeader from "../Product/ProductHeader";
import Carosuel from "../../utils/Carosuel";

const Home = () => {
  return (
    <React.Fragment>
      <Navbar></Navbar>
        <Carosuel/>
        <Fragment>
          {/* <ProductHeader /> */}
          <ProductList></ProductList>
        </Fragment>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
