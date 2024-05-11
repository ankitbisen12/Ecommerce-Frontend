import React, { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { HiBars3BottomRight } from "react-icons/hi2";
import { GiTireIronCross } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectItems } from "../../features/Cart/cartSlice";
import logo from "../../assest/logo.png";
import { selectUserInfo } from "../../features/user/userSlice";

// const user = {
//   name: "Tom Cook",
//   email: "tom@example.com",
//   imageUrl:
//     "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
// };

const navigation = [
  { name: "Products", link: "/", user: true },
  { name: "Admin", link: "/admin", admin: true },
  { name: "Orders", link: "/admin/orders", admin: true },
];

const userNavigation = [
  { name: "Profile", link: "/profile" },
  { name: "My Orders", link: "/orders" },
  { name: "Sign out", link: "/logout" },
];

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const Navbar = (props) => {
  const items = useSelector(selectItems);
  const userInfo = useSelector(selectUserInfo);

  return (
    <React.Fragment>
      {userInfo && (
        <div className="min-h-full">
          <Disclosure as="nav" className="bg-slate-900">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-8xl pr-4 sm:px-6 lg:px-8">
                  <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Link to="/">
                          <img
                            className="h-24 w-24 mt-2"
                            src={logo}
                            alt="Your Company"
                          />
                        </Link>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-6 flex items-baseline space-x-4">
                          {navigation.map((item) =>
                            item[userInfo.role] ? (
                              <Link
                                key={item.name}
                                to={item.link}
                                className={classNames(
                                  item.current
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-300 hover:bg-slate-800 hover:text-white",
                                  "rounded-md px-3 py-1 text-2xl font-semibold mt-2"
                                )}
                                aria-current={item.current ? "page" : undefined}
                              >
                                {item.name}
                              </Link>
                            ) : null
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-4 flex items-center md:ml-6">
                        <Link to="/cart">
                          <button
                            type="button"
                            className="rounded-full p-1 text-gray-300 hover:text-white  cursor-pointer"
                          >
                            <ShoppingCartIcon
                              className="h-8 w-8"
                              aria-hidden="true"
                            />
                          </button>
                        </Link>
                        {items.length > 0 && (
                          <span className="inline-flex items-center rounded-md mb-7 -ml-3 bg-red-500 px-2 py-0.5 text-sm font-medium text-white ">
                            {items.length}
                          </span>
                        )}
                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm">
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-10 w-10 rounded-full"
                                src={userInfo.imageUrl}
                                alt=""
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <Link
                                      to={item.link}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-lg font-semibold text-gray-700"
                                      )}
                                    >
                                      {item.name}
                                    </Link>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="inline-flex items-center justify-center rounded-md  px-2 py-1 text-gray-400">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <GiTireIronCross
                            className="block h-7 w-7 font-bold"
                            aria-hidden="true"
                          />
                        ) : (
                          <HiBars3BottomRight
                            className="block h-7 w-7"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="md:hidden">
                  <div className="space-y-1 px-2 pt-2">
                    {navigation.map((item) =>
                      item[userInfo.role] ? (
                        <Link
                          key={item.name}
                          to={item.link}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:text-white",
                            "rounded-md px-3 py-1 text-lg font-semibold mt-2"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ) : null
                    )}
                  </div>
                  <div className="pb-3">
                    <div className="mt-3 space-y-1 px-2">
                      {userNavigation.map((item) => (
                        // <Link
                        //   key={item.name}
                        //   as="a"
                        //   href={item.link}
                        //   className="block rounded-md px-3 py-1 text-lg font-medium text-gray-300 cursor-pointer"
                        // >
                        <Link
                          to={item.link}
                          className="block rounded-md px-3 py-1 text-lg font-medium text-gray-300 cursor-pointer"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={userInfo.imageUrl}
                          alt="userInfoImageUrl"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-base font-medium leading-none text-white">
                          {/* this should come from userInfo */}
                          {userInfo.name}
                        </div>
                        <div className="text-sm font-medium leading-none text-gray-300">
                          {userInfo.email}
                        </div>
                      </div>
                      <Link to="/cart">
                        <button
                          type="button"
                          className="ml-2 flex-shrink-0 rounded-full p-1 text-gray-300  cursor-pointer"
                        >
                          <ShoppingCartIcon
                            className="h-7 w-7"
                            aria-hidden="true"
                          />
                        </button>
                      </Link>
                      {items.length > 0 && (
                        <span className="inline-flex items-center rounded-md mb-7 -ml-3 bg-red-500 px-2 py-0.5 text-sm font-medium text-white ">
                          {items.length}
                        </span>
                      )}
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {/* <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              E-commerce
            </h1>
          </div>
        </header> */}
          {/* {props && (
            <main>
              <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                {props.children}
              </div>
            </main> */}
          {/* )} */}
        </div>
      )}
    </React.Fragment>
  );
};

export default Navbar;
