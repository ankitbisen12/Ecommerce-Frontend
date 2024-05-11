import { React, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  deleteItemFromCartAsync,
  selectCartLoaded,
  selectCartStatus,
  selectItems,
  updateCartAsync,
} from "./cartSlice";
import Modal from "../../common/Modal";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  // console.log(items);
  const status = useSelector(selectCartStatus);
  const cartLoaded = useSelector(selectCartLoaded);
  const [openModal, setOpenModal] = useState(null);
  const totalAmount = items.reduce(
    (amount, item) => item.product.discountPrice * item.quantity + amount,
    0
  );

  const totalItems = items.reduce((total, item) => item.quantity + total, 0);
  const handleQuantity = (e, item) => {
    dispatch(
      updateCartAsync({ id: item.id, quantity: +e.target.value, toast })
    );
  };

  const deleteHandler = (e, itemId) => {
    dispatch(deleteItemFromCartAsync(itemId));
  };

  return (
    <Fragment>
      {!items.length && cartLoaded && (
        <Navigate to="/empty-cart" replace={true}></Navigate>
      )}
      {status === "loading" ? (
        <div className="flex items-center justify-center">
          <RotatingLines
            visible={true}
            height="70"
            width="70"
            color="#212020"
            barColor="#212020"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : null}
      <ToastContainer />
      <div className="mx-auto mt-12 bg-white max-w-7xl px-0 sm:px-4 lg:px-8">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-4xl my-5 font-semibold tracking-tight text-gray-900">
            Cart
          </h1>
          <div className="flow-root">
            <ul className="-my-6 divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-none border border-gray-200">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-2 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <Link to={`/product-detail/${item.product.id}`}>
                            {item.product.title}
                          </Link>
                        </h3>
                        <p className="ml-4">₹{item.product.discountPrice}</p>
                      </div>
                      <div className="flex justify-between text-base font-medium ">
                        <p className="mt-1 text-sm text-gray-500">
                          {item.product.brand}
                        </p>
                        <p className="ml-4 text-sm line-through text-gray-500">
                          ₹{item.product.price}
                        </p>
                      </div>

                      <p className="mt-1 text-sm text-gray-500">
                        Size: {item.size && item.size.name}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500">
                        <label
                          htmlFor="quantity"
                          className="inline mr-3 text-sm font-medium leading-6 text-gray-900"
                        >
                          Qty
                        </label>
                        <select
                          onChange={(e) => handleQuantity(e, item)}
                          className="hover:outline-none focus:outline-none"
                          value={item.quantity}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                      <div className="flex">
                        <Modal
                          title={`Delete ${item.product.title}`}
                          message="Are you sure you want to delete this cart item"
                          img={item.product.thumbnail}
                          dangerOption="Delete"
                          cancelOption="Cancel"
                          dangerAction={(e) => deleteHandler(e, item.id)}
                          cancelAction={() => setOpenModal(-1)}
                          showModal={openModal === item.id}
                        />
                        <button
                          onClick={() => setOpenModal(item.id)}
                          type="button"
                          className="font-medium text-lg text-gray-600 "
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="px-2 sm:px-6 md:px-4 lg:px-4 py-2 md:py-4 lg:py-6 ">
          <hr className="border-gray-200" />
          <div className="flex justify-between my-2 text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>₹{totalAmount}</p>
          </div>
          <div className="flex justify-between my-2 text-base font-medium text-gray-900">
            <p>Total Items in Cart</p>
            <p>{totalItems} items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
              to="/Checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-slate-900 px-6 py-3 text-base font-medium text-white shadow-sm "
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or
              <Link to="/">
                <button
                  type="button"
                  className="font-medium text-gray-700  ml-1"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* {!items.length && cartLoaded && <Navigate to="/empty-cart" replace={true}></Navigate>}
      <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
            Cart
          </h1>
          <div className="flow-root">
            {status === "loading" ? (
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            ) : null}
            <ul className="-my-6 divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.product.imageSrc}
                      alt={item.product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={item.product.id}>{item.product.title}</a>
                        </h3>
                        <p className="ml-4">${discountedPrice(item.product)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.product.brand}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500">
                        <label
                          htmlFor="quantity"
                          className="inline mr-3 text-sm font-medium leading-6 text-gray-900"
                        >
                          Qty
                        </label>
                        <select
                          onChange={(e) => handleQuantity(e, item)}
                          value={items.quantity}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                      <div className="flex">
                        <Modal
                          title={`Delete ${item.product.title}`}
                          message="Are you sure you want to delete this cart item"
                          img={item.product.imageSrc}
                          dangerOption="Delete"
                          cancelOption="Cancel"
                          dangerAction={(e) => deleteHandler(e, item._id)}
                          cancelAction={() => setOpenModal(-1)}
                          showModal={openModal === item.id}
                        />
                        <button
                          onClick={() => setOpenModal(item.id)}
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between my-2 text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${totalAmount}</p>
          </div>
          <div className="flex justify-between my-2 text-base font-medium text-gray-900">
            <p>Total Items in Cart</p>
            <p>{totalItems} items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or
              <Link to="/">
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div> */}
    </Fragment>
  );
};

export default Cart;
