import React, { useEffect, useState } from "react";
import {
  ITEMS_PER_PAGE,
  chooseColor,
} from "../../common/constant";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrderAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../order/orderSlice";
import {
  EyeIcon,
  PencilIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { Pagination } from "../../common/Pagination";

const AdminOrders = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState({});

  const handleShow = (order) => {
    // setEditableOrderId(order.id);
    console.log("handleShow");
    console.log(order);
  };

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };

  const handleUpdate = (e, order) => {
    const updateOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updateOrder));
    setEditableOrderId(-1);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  const handleSort = (str) => {
    const sort = { _sort: str.sort, _order: str.order };
    console.log({ sort });
    setSort(sort);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrderAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

  return (
    <div className="overflow-x-auto">
      <div className="bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full">
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th
                    className="py-3 px-0 text-left cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: "id",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Order#{" "}
                    {sort._sort === "id" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th className="py-3 px-0 text-left">Items</th>
                  <th
                    className="py-3 px-0 text-center cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: "totalAmount",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Total Amount{" "}
                    {sort._sort === "totalAmount" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th className="py-3 px-0 text-center">Shipping Address</th>
                  <th className="py-3 px-0 text-center">Status</th>
                  <th
                    className="py-3 px-0 text-center cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: "createdAt",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Order Time{" "}
                    {sort._sort === "createdAt" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th
                    className="py-3 px-0 text-center cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: "updatedAt",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Last updated{" "}
                    {sort._sort === "updatedAt" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th className="py-3 px-0 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orders.map((order, index) => (
                  <tr
                    className="border-b border-gray-200 hover:bg-gray-100"
                    key={order.id}
                  >
                    <td className="py-3 px-0 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-2"></div>
                        <span className="font-medium">{order.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-0 text-left">
                      {order.items.map((item, index) => (
                        <div className="flex items-center" key={index}>
                          <div className="mr-2">
                            <img
                              className="w-6 h-6 rounded-full"
                              src={item.product.thumbnail}
                              alt={item.product.title}
                            />
                          </div>
                          <span>
                            {item.product.title} -#{item.quantity} - $
                            {item.product.discountPrice}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-0 text-center">
                      <div className="flex items-center justify-center">
                      ₹{order.totalAmount}
                      </div>
                    </td>
                    <td className="py-3 px-0 text-center">
                      <div className="items-center justify-center">
                        <div>
                          <strong>{order.selectedAddress.name}, </strong>
                        </div>
                        <div> {order.selectedAddress.street},</div>
                        <div> {order.selectedAddress.city},</div>
                        <div>{order.selectedAddress.state},</div>
                        <div>{order.selectedAddress.pinCode},</div>
                        <div>{order.selectedAddress.phone}</div>
                      </div>
                    </td>
                    <td className="py-3 px-0 text-center">
                      {order.id === editableOrderId ? (
                        <select onChange={(e) => handleUpdate(e, order)}>
                          <option value="Pending">Pending</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Delivered">Delievered</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="InWarehouse">In Warehouse</option>
                          <option value="Refunded">Refunded</option>
                        </select>
                      ) : (
                        <span
                          className={`${chooseColor(
                            order.status
                          )} py-1 px-3 rounded-full text-xs`}
                        >
                          {order.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-0 text-center">
                      <div className="flex items-center justify-center">
                        {order.createdAt
                          ? new Date(order.createdAt).toDateString()
                          : null}
                      </div>
                    </td>
                    <td className="py-3 px-0 text-center">
                      <div className="flex items-center justify-center">
                        {order.updatedAt
                          ? new Date(order.createdAt).toLocaleString()
                          : null}
                      </div>
                    </td>
                    <td className="py-3 px-0 text-center">
                      <div className="flex item-center justify-center">
                        <div className="w-6 mr-4 transform hover:text-green-500 hover:scale-110 cursor-pointer">
                          <EyeIcon
                            className="w-8 h-8"
                            onClick={(e) => handleShow(order)}
                          />
                        </div>
                        <div className="w-6 mr-4 transform hover:text-blue-500 hover:scale-110 cursor-pointer">
                          <PencilIcon
                            className="w-8 h-8"
                            onClick={(e) => handleEdit(order)}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        handlePage={handlePage}
        totalItems={totalOrders}
      ></Pagination>
    </div>
  );
};

export default AdminOrders;