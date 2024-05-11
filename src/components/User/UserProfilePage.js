import React from "react";
import Navbar from "../NavBar/Navbar";
import UserProfile from "../../features/user/components/UserProfile";

const UserProfilePage = () => {
  return (
    <React.Fragment>
      <Navbar></Navbar>
      {/* <h1 className="text-2xl font-bold">My Profile</h1> */}
      <UserProfile />
    </React.Fragment>
  );
};

export default UserProfilePage;
