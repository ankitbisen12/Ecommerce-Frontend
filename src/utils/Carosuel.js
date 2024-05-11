import { useState } from "react";
import {
  BsFillArrowRightSquareFill,
  BsFillArrowLeftSquareFill 
} from "react-icons/bs";

import banner1 from "../assest/banner1.png"
import banner2 from "../assest/banner2.png"
import banner3 from "../assest/banner3.png"
import banner4 from "../assest/banner4.png"
import banner11 from "../assest/banner11.png"
import banner22 from "../assest/banner22.png"
import banner33 from "../assest/banner33.png"
import banner44 from "../assest/banner44.png"

let slides = [banner1,banner2,banner3,banner4];
let slides1 =[banner11,banner22,banner33,banner44];

export default function Carousel() {
  let [current, setCurrent] = useState(0);

  let previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  let nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  return (
    <div className="w-[100%] h-705 md:h-[80%] lg:h-[70%] m-auto">
      <div className="overflow-hidden relative">
        <div
          className={`flex transition ease-out duration-40`}
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {slides.map((s) => {
            return <img src={s} className="lg:hidden" alt={s}/>;
          })}
          {slides1.map((s) => {
            return <img src={s} className="hidden lg:block" alt={s}/>;
          })}
        </div>

        <div className="absolute top-0 h-full w-full justify-between items-center flex text-white px-2 md:px-4 lg:px-6 text-3xl">
          <button onClick={previousSlide}>
          <BsFillArrowLeftSquareFill className="text-lg lg:text-6xl font-bold"/>
          </button>
          <button onClick={nextSlide}>
          <BsFillArrowRightSquareFill className="text-lg lg:text-6xl font-bold"/>
          </button>
        </div>

        <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
          {slides.map((s, i) => {
            return (
              <div
                onClick={() => {
                  setCurrent(i);
                }}
                key={"circle" + i}
                className={` w-3 h-3 cursor-pointer  ${
                  i === current ? "bg-white rounded-none" : "bg-gray-500 rounded-full"
                }`}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}