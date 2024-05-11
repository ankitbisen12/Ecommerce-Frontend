import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoggedInUserOrdersAsync,
  // selectUserInfo,
  selectUserOrders,
  selectedStatus,
} from "../userSlice";
import { chooseTextColor } from "../../../common/constant";
import { RotatingLines } from "react-loader-spinner";
import { Link } from "react-router-dom";

const UserOrders = () => {
  const dispatch = useDispatch();

  const orders = useSelector(selectUserOrders);
  // console.log("orders", orders);
  const status = useSelector(selectedStatus);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync());
  }, [dispatch]);

  return (
    <div>
      {status === "loading" ? (
        <div className="flex items-center mt-2 justify-center">
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
      {orders &&
        orders.map((order) => (
          <div key={order.id}>
            <div className="mx-auto mt-12 max-w-7xl px-2 sm:px-6 lg:px-8 tilt-neon-pp">
              <div className="px-2 bg-white border-2 border-gray">
                <div className="px-2 md:px-4 lg:px-4 py-6 sm:px-6">
                  <h1 className="text-lg md:text-2xl lg:text-4xl mt-3 font-bold tracking-tight text-gray-700">
                    Order Id: {order.id}
                  </h1>
                  <h3
                    className={`text-lg md:text-xl lg:text-xl font-bold tracking-tight ${chooseTextColor(
                      order.status
                    )}`}
                  >
                    Order Status: {order.status}
                  </h3>
                  <div className="flow-root">
                    <ul className="-my-6 divide-y divide-gray-200">
                      {order.items.map((item) => (
                        <li key={item.id} className="flex pt-6 pb-2">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden border border-gray-200">
                            <img
                              src={item.product.thumbnail}
                              alt={item.product.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="ml-2 md:ml-4 lg:ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <Link to={`/product-detail/${item.product.id}`}>
                                    {item.product.title}
                                  </Link>
                                </h3>
                                <p className="ml-4">
                                  ₹{item.product.discountPrice}
                                </p>
                              </div>
                              <div className="flex justify-between text-base font-medium ">
                                <p className="mt-1 text-sm text-gray-500">
                                  {item.product.brand}
                                </p>
                                <p className="ml-4 text-sm line-through text-gray-500">
                                  ₹{item.product.price}
                                </p>
                              </div>
                              {item.size.name && (
                                <p className="mt-1 text-sm text-gray-500">
                                  Size: {item.size.name}
                                </p>
                              )}
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-500">
                                <label
                                  htmlFor="quantity"
                                  className="inline text-sm font-medium leading-6 text-gray-900"
                                >
                                  Qty :{item.quantity}
                                </label>
                              </div>
                              <div className="flex"></div>
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
                    <p>SubTotal</p>
                    <p>₹ {order.totalAmount}</p>
                  </div>
                  <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                    <p>Total Items</p>
                    <p>{order.totalItems} items</p>
                  </div>
                  <p className="my-0.5 text-lg  text-gray-500">
                    Shipping address
                  </p>
                  <div className="flex justify-between gap-x-6 p-3 md:p-3 lg:p-5 rounded-lg border-dashed border-2 border-gray">
                    <div className="flex gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-lg font-semibold leading-6 text-gray-700">
                          {order.selectedAddress.name}
                        </p>
                        <p className="mt-1 text-md leading-5 text-gray-500 max-w-xs md:max-w-md lg:max-w-xl">
                          {order.selectedAddress.street}
                        </p>
                        <p className="mt-1 truncate text-md leading-5 text-gray-500">
                          {order.selectedAddress.pinCode}
                        </p>
                      </div>
                    </div>

                    <div className="hidden sm:flex sm:flex-col">
                      <p className="text-md leading-6 text-gray-900">
                        {order.selectedAddress.phone}
                      </p>
                      <p className="text-md leading-6 text-gray-900">
                        {order.selectedAddress.city}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      {orders && orders.length === 0 && status === "idle" && (
        <div className="flex flex-col justify-center items-center h-screen bg-white p-4 recursive-pp">
          <div className="w-[250px] h-[200px] mb-2">
            <div className="flex flex-col items-center text-center">
              <span className="font-medium text-2xl text-gray-900 p-2">
                Not placed any order.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrders;
