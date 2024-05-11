import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectLoggedInUser } from "./authSlice";
import { Navigate } from "react-router-dom";
import { selectUserInfo } from "../user/userSlice";

const ProtectedAdmin = (props) => {
  const user = useSelector(selectLoggedInUser);
  const userInfo = useSelector(selectUserInfo);

  if (!user) {
    return <Navigate to="/login"></Navigate>;
  }
  if (userInfo && userInfo.role !== "admin") {
    return <Navigate to="/"></Navigate>;
  }
  return props.children;
};

export default ProtectedAdmin;
