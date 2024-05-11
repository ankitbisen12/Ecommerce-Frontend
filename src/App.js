import React, { useEffect } from "react";
import Home from "./components/Home/Home";
import LoginPage from "./components/Login/LoginPage";
import SignUpPage from "./components/SignUp/SignUpPage";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CartPage from "./components/Cart/CartPage";
import ProductDetailPage from "./components/Product/ProductDetailPage";
import Protected from "./features/auth/Protected";
import { useDispatch, useSelector } from "react-redux";
import {
  checkAuthAsync,
  selectCheckedUser,
  selectLoggedInUser,
} from "./features/auth/authSlice";
import { fetchItemsByUserIdAsync } from "./features/Cart/cartSlice";
import PageNotFound from "./components/404";
import OrderSuccessPage from "./components/OrderSuccessPage";
import UserOrdersPage from "./components/User/UserOrdersPage";
import UserProfilePage from "./components/User/UserProfilePage";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import Logout from "./features/auth/Logout";
import ForgotPasswordPage from "./features/auth/ForgotPasswordPage";
import AdminHome from "./components/Home/AdminHome";
import ProtectedAdmin from "./features/auth/ProtectedAdmin";
import AdminProductFormPage from "./components/Product/AdminProductFormPage";
import AdminOrderPage from "./components/AdminOrdersPage";
import ResetPasswordPage from "./components/User/ResetPasswordPage";
import { positions, Provider } from "react-alert";
// import AlertTemplate from "react-alert-template-basic";
import EmptyCartPage from "./components/Cart/EmptyCartPage";
import CheckoutPage from "./components/Checkout/CheckoutPage";
import StripeCheckout from "./components/stripe/StripeCheckout";

// const options = {
//   timeout: 5000,
//   position: positions.BOTTOM_LEFT,
// };

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignUpPage></SignUpPage>,
  },
  {
    path: "/Cart",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/empty-cart",
    element: (
      <Protected>
        <EmptyCartPage></EmptyCartPage>
      </Protected>
    ),
  },
  {
    path: "/Checkout",
    element: (
      <Protected>
        <CheckoutPage></CheckoutPage>
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailPage></ProductDetailPage>,
      </Protected>
    ),
  },
  {
    path: "/admin/product-detail/:id",
    element: (
      <ProtectedAdmin>
        <ProductDetailPage></ProductDetailPage>,
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedAdmin>
        <AdminOrderPage></AdminOrderPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/order-success/:id",
    element: (
      <Protected>
        <OrderSuccessPage></OrderSuccessPage>,
      </Protected>
    ),
  },
  {
    path: "/orders",
    element: (
      <UserOrdersPage></UserOrdersPage>
      //we will add page later right now using component directly.
    ),
  },
  {
    path: "/profile",
    element: <UserProfilePage></UserProfilePage>,
  },
  {
    path: "/logout",
    element: <Logout></Logout>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage></ForgotPasswordPage>,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage></ResetPasswordPage>,
  },
  {
    path: "/stripe-checkout",
    element: (
      <Protected>
        <StripeCheckout></StripeCheckout>
      </Protected>
    ),
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectCheckedUser);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync());
      //we can get req.user by token on backend so no need to given in front-end
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, user]);

  return (
    <div className="recursive-pp">
      {/* {userChecked && <RouterProvider router={router} />}
      Link must be inside the Provider */}

      {userChecked && (
        <Provider >
          <RouterProvider router={router} />
        </Provider>
      )}
    </div>
  );
}

export default App;
