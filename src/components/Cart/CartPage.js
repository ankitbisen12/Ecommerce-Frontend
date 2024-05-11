import React from "react";
import Cart from "../../features/Cart/Cart";
import NavBar from "../NavBar/Navbar";
import Footer from "../Footer/footer";

const CartPage = () => {
  return (
    <React.Fragment>
      <NavBar></NavBar>
      <Cart />
      <Footer />
    </React.Fragment>
  );
};

export default CartPage;
