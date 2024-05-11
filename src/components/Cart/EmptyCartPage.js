import React from "react";
import Navbar from "../NavBar/Navbar";
import EmptyCart from "../../utils/EmptyCart";

const EmptyCartPage = () => {
  return (
    <React.Fragment>
      <Navbar>
      </Navbar>
        <EmptyCart />
    </React.Fragment>
  );
};

export default EmptyCartPage;
