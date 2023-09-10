import React, { Fragment, useEffect } from "react";
import { selectLoggedInUser, signOutAsync } from "./authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    dispatch(signOutAsync());
  }, [dispatch]);

  //but useEffect runs after render,so we have to delay navigate part
  return (
    <Fragment>
      {!user && <Navigate to="/login" replace={true}></Navigate>}
    </Fragment>
  );
};

export default Logout;
