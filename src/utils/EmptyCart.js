import React from "react";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white p-4 recursive-pp">
      <div className="w-[250px] h-[200px] mb-2">
        <img
          src="https://media.istockphoto.com/id/1206806317/vector/shopping-cart-icon-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=1RRQJs5NDhcB67necQn1WCpJX2YMfWZ4rYi1DFKlkNA="
          alt="cart"
          className="w-full h-full object-center object-cover pp text-gray-600"
        />
      </div>
      <div className="flex flex-col items-center text-center">
        <span className="font-medium text-2xl text-gray-900   p-2">
          Your cart is empty
        </span>
        <span className="font-normal text-xl text-gray-400   p-2">
          Looks like you haven't made your choice yet..
        </span>
        <Link
          to="/"
          className="mt-10 flex  items-center justify-center rounded-md border border-transparent bg-slate-900 px-8 py-3 text-xl font-medium text-white hover:bg-slate-800 focus:outline-none"
        >
          Return to HomePage
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
