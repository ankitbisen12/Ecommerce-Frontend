import React from "react";
import { FaInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className=" bg-slate-900">
      <div className="max-w-2xl mx-auto text-white py-10">
        <div className="text-center">
          <h3 className="text-xl lg:text-3xl"> Download our Ecommerce app </h3>
          <div className="flex justify-center my-10">
            <div className="flex items-center border w-auto rounded-lg px-2 py-2 w-52 mx-2">
              <img
                src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
                className="w-7 md:w-8"
                alt="google play"
              />
              <div className="text-left ml-3">
                <p className="text-xs text-gray-200">Download on </p>
                <p className="text-xs lg:text-sm md:text-base">
                  {" "}
                  Google Play Store{" "}
                </p>
              </div>
            </div>
            <div className="flex items-center border w-auto rounded-lg px-2 py-2 w-44 mx-2">
              <img
                src="https://cdn-icons-png.flaticon.com/512/888/888841.png"
                className="w-7 md:w-8"
                alt="img2"
              />
              <div className="text-left ml-3">
                <p className="text-xs text-gray-200">Download on </p>
                <p className="text-sm md:text-base"> Apple Store </p>
              </div>
            </div>
          </div>
          <h3 className="text-lg  lg:text-2xl mb-1">
            100% PAYMENT PROTECTION{" "}
          </h3>
          <div className="flex justify-center">
            <div className="flex justify-center items-center w-screen  bg-transparent">
              <div className="w-200 h-150 flex justify-between">
                <div className="w-1/3">
                  <img
                    src="https://1000logos.net/wp-content/uploads/2017/06/VISA-Logo.jpg"
                    alt="visa"
                    className="w-[100px] h-[50px]"
                  />
                </div>
                <div className="w-1/3 ml-2">
                  <img
                    src="https://th-i.thgim.com/public/sci-tech/technology/gadgets/article16977337.ece/alternates/LANDSCAPE_1200/Bhim_Main"
                    alt="bhim upi"
                    className="w-[100px] h-[50px]"
                  />
                </div>
                <div className="w-1/3 ml-2">
                  <img
                    src="https://www.investopedia.com/thmb/F8CKM3YkF1fmnRCU2g4knuK0eDY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MClogo-c823e495c5cf455c89ddfb0e17fc7978.jpg"
                    alt="mastercard"
                    className="w-[100px] h-[50px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col md:flex-row md:justify-between items-center text-sm md:text-md lg:text-lg text-gray-400">
          <p className="order-2 md:order-1 mt-8 md:mt-0">
            {" "}
            help.wewears@gmail.com
          </p>
          <div className="flex flex-row order-1 md:order-2">
            <span className="px-2">About us</span>
            <span className="px-2 border-l">Contact us</span>
            <a href="https://www.instagram.com/ankit_bisen18/" target="_blank">
              <span className="px-2 border-l flex flex-row items-center">
                <FaInstagram className="mr-1" />
                Instagram
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
