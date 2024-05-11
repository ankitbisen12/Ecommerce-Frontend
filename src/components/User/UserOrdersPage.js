import React from "react";
import Navbar from "../NavBar/Navbar";
import UserOrders from "../../features/user/components/UserOrders";

const UserOrdersPage = () => {
  return (
    <React.Fragment>
      <Navbar></Navbar>
      {/* <h1 className="mx-auto text-2xl font-bold">My Orders</h1> */}
      <UserOrders />
    </React.Fragment>
  );
};

export default UserOrdersPage;
