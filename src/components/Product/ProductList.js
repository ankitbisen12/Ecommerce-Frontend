import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { ImCross } from "react-icons/im";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { RotatingLines } from "react-loader-spinner";
import {
  ChevronDownIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import {
  fetchBrandsAsync,
  fetchCategoriesAsync,
  fetchProductsByFilterAsync,
  selectBrands,
  selectCategories,
  selectTotalItems,
  selectedStatus,
  selectProducts,
} from "../../features/product/ProductListSlice";
import { ITEMS_PER_PAGE, getDaySuffix } from "../../common/constant";
import { Pagination } from "../../common/Pagination";

import { getNextDatePlusFive } from "../../common/constant";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "asc", current: false },
  {
    name: "Price: Low to High",
    sort: "discountPrice",
    order: "asc",
    current: false,
  },
  {
    name: "Price: High to Low",
    sort: "discountPrice",
    order: "desc",
    current: false,
  },
];

// const filters = [
//   {
//     id: "Category",
//     name: "Category",
//     options: [
//       { value: "SmartWatch", label: "SmartWatch", checked: false },
//       { value: "Hoddies", label: "Hoddies", checked: false },
//       { value: "Cargo Pants", label: "Cargo Pants", checked: false },
//       { value: "Jeans", label: "Jeans", checked: false },
//       { value: "Tshirts", label: "Tshirts", checked: false },
//     ],
//   },
//   {
//     id: "Brand",
//     name: "Brands",
//     options: [
//       { value: "Realme", label: "Realme", checked: false },
//       { value: "Fire bolt", label: "Fire bolt", checked: false },
//       { value: "Roadster", label: "Roadster", checked: false },
//       { value: "Bewakoof", label: "Bewakoof", checked: false },
//       { value: "Highlander", label: "Highlander", checked: false },
//       { value: "Ether", label: "Ether", checked: false },
//       { value: "Locomotive", label: "Locomotive", checked: false },
//     ],
//   },
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// const oldProducts = [
//   {
//     id: 1,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 2,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 3,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 4,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 5,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
// ];

//   {
//     id: 1,
//     title: "iPhone 9",
//     description: "An apple mobile which is nothing like apple",
//     price: 549,
//     discountPercentage: 12.96,
//     rating: 4.69,
//     stock: 94,
//     brand: "Apple",
//     category: "smartphones",
//     imageSrc: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
//     images: [
//       "https://i.dummyjson.com/data/products/1/1.jpg",
//       "https://i.dummyjson.com/data/products/1/2.jpg",
//       "https://i.dummyjson.com/data/products/1/3.jpg",
//       "https://i.dummyjson.com/data/products/1/4.jpg",
//       "https://i.dummyjson.com/data/products/1/imageSrc.jpg",
//     ],
//   },
//   {
//     id: 2,
//     title: "iPhone X",
//     description:
//       "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
//     price: 899,
//     discountPercentage: 17.94,
//     rating: 4.44,
//     stock: 34,
//     brand: "Apple",
//     category: "smartphones",
//     imageSrc: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
//     images: [
//       "https://i.dummyjson.com/data/products/2/1.jpg",
//       "https://i.dummyjson.com/data/products/2/2.jpg",
//       "https://i.dummyjson.com/data/products/2/3.jpg",
//       "https://i.dummyjson.com/data/products/2/imageSrc.jpg",
//     ],
//   },
//   {
//     id: 3,
//     title: "Samsung Universe 9",
//     description:
//       "Samsung's new variant which goes beyond Galaxy to the Universe",
//     price: 1249,
//     discountPercentage: 15.46,
//     rating: 4.09,
//     stock: 36,
//     brand: "Samsung",
//     category: "smartphones",
//     imageSrc: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
//     images: ["https://i.dummyjson.com/data/products/3/1.jpg"],
//   },
//   {
//     id: 4,
//     title: "OPPOF19",
//     description: "OPPO F19 is officially announced on April 2021.",
//     price: 280,
//     discountPercentage: 17.91,
//     rating: 4.3,
//     stock: 123,
//     brand: "OPPO",
//     category: "smartphones",
//     imageSrc: "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
//     images: [
//       "https://i.dummyjson.com/data/products/4/1.jpg",
//       "https://i.dummyjson.com/data/products/4/2.jpg",
//       "https://i.dummyjson.com/data/products/4/3.jpg",
//       "https://i.dummyjson.com/data/products/4/4.jpg",
//       "https://i.dummyjson.com/data/products/4/imageSrc.jpg",
//     ],
//   },
//   {
//     id: 5,
//     title: "Huawei P30",
//     description:
//       "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
//     price: 499,
//     discountPercentage: 10.58,
//     rating: 4.09,
//     stock: 32,
//     brand: "Huawei",
//     category: "smartphones",
//     imageSrc: "https://i.dummyjson.com/data/products/5/thumbnail.jpg",
//     images: [
//       "https://i.dummyjson.com/data/products/5/1.jpg",
//       "https://i.dummyjson.com/data/products/5/2.jpg",
//       "https://i.dummyjson.com/data/products/5/3.jpg",
//     ],
//   },
//   {
//     id: 6,
//     title: "MacBook Pro",
//     description:
//       "MacBook Pro 2021 with mini-LED display may launch between September, November",
//     price: 1749,
//     discountPercentage: 11.02,
//     rating: 4.57,
//     stock: 83,
//     brand: "Apple",
//     category: "laptops",
//     imageSrc: "https://i.dummyjson.com/data/products/6/thumbnail.png",
//     images: [
//       "https://i.dummyjson.com/data/products/6/1.png",
//       "https://i.dummyjson.com/data/products/6/2.jpg",
//       "https://i.dummyjson.com/data/products/6/3.png",
//       "https://i.dummyjson.com/data/products/6/4.jpg",
//     ],
//   },
//   {
//     id: 7,
//     title: "Samsung Galaxy Book",
//     description:
//       "Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched",
//     price: 1499,
//     discountPercentage: 4.15,
//     rating: 4.25,
//     stock: 50,
//     brand: "Samsung",
//     category: "laptops",
//     imageSrc: "https://i.dummyjson.com/data/products/7/thumbnail.jpg",
//     images: [
//       "https://i.dummyjson.com/data/products/7/1.jpg",
//       "https://i.dummyjson.com/data/products/7/2.jpg",
//       "https://i.dummyjson.com/data/products/7/3.jpg",
//       "https://i.dummyjson.com/data/products/7/imageSrc.jpg",
//     ],
//   },
//   {
//     id: 8,
//     title: "Microsoft Surface Laptop 4",
//     description:
//       "Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.",
//     price: 1499,
//     discountPercentage: 10.23,
//     rating: 4.43,
//     stock: 68,
//     brand: "Microsoft Surface",
//     category: "laptops",
//     imageSrc: "https://i.dummyjson.com/data/products/8/thumbnail.jpg",
//     images: [
//       "https://i.dummyjson.com/data/products/8/1.jpg",
//       "https://i.dummyjson.com/data/products/8/2.jpg",
//       "https://i.dummyjson.com/data/products/8/3.jpg",
//       "https://i.dummyjson.com/data/products/8/4.jpg",
//       "https://i.dummyjson.com/data/products/8/imageSrc.jpg",
//     ],
//   },
//   {
//     id: 9,
//     title: "Infinix INBOOK",
//     description:
//       "Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty",
//     price: 1099,
//     discountPercentage: 11.83,
//     rating: 4.54,
//     stock: 96,
//     brand: "Infinix",
//     category: "laptops",
//     imageSrc: "https://i.dummyjson.com/data/products/9/thumbnail.jpg",
//     images: [
//       "https://i.dummyjson.com/data/products/9/1.jpg",
//       "https://i.dummyjson.com/data/products/9/2.png",
//       "https://i.dummyjson.com/data/products/9/3.png",
//       "https://i.dummyjson.com/data/products/9/4.jpg",
//       "https://i.dummyjson.com/data/products/9/imageSrc.jpg",
//     ],
//   },
//   {
//     id: 10,
//     title: "HP Pavilion 15-DK1056WM",
//     description:
//       "HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10",
//     price: 1099,
//     discountPercentage: 6.18,
//     rating: 4.43,
//     stock: 89,
//     brand: "HP Pavilion",
//     category: "laptops",
//     imageSrc: "https://i.dummyjson.com/data/products/10/thumbnail.jpeg",
//     images: [
//       "https://i.dummyjson.com/data/products/10/1.jpg",
//       "https://i.dummyjson.com/data/products/10/2.jpg",
//       "https://i.dummyjson.com/data/products/10/3.jpg",
//       "https://i.dummyjson.com/data/products/10/imageSrc.jpeg",
//     ],
//   },
//   {
//     id: 11,
//     title: "perfume Oil",
//     description:
//       "Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil",
//     price: 13,
//     discountPercentage: 8.4,
//     rating: 4.26,
//     stock: 65,
//     brand: "Impression of Acqua Di Gio",
//     category: "fragrances",
//     imageSrc: "https://i.dummyjson.com/data/products/11/thumbnail.jpg",
//     images: [
//       "https://i.dummyjson.com/data/products/11/1.jpg",
//       "https://i.dummyjson.com/data/products/11/2.jpg",
//       "https://i.dummyjson.com/data/products/11/3.jpg",
//       "https://i.dummyjson.com/data/products/11/imageSrc.jpg",
//     ],
//   },
//   {
//     id: 12,
//     title: "Brown Perfume",
//     description: "Royal_Mirage Sport Brown Perfume for Men & Women - 120ml",
//     price: 40,
//     discountPercentage: 15.66,
//     rating: 4,
//     stock: 52,
//     brand: "Royal_Mirage",
//     category: "fragrances",
//     imageSrc: "https://i.dummyjson.com/data/products/12/thumbnail.jpg",
//     images: [
//       "https://i.dummyjson.com/data/products/12/1.jpg",
//       "https://i.dummyjson.com/data/products/12/2.jpg",
//       "https://i.dummyjson.com/data/products/12/3.png",
//       "https://i.dummyjson.com/data/products/12/4.jpg",
//       "https://i.dummyjson.com/data/products/12/imageSrc.jpg",
//     ],
//   },
//   {
//     id: 13,
//     title: "Fog Scent Xpressio Perfume",
//     description:
//       "Product details of Best Fog Scent Xpressio Perfume 100ml For Men cool long lasting perfumes for Men",
//     price: 13,
//     discountPercentage: 8.14,
//     rating: 4.59,
//     stock: 61,
//     brand: "Fog Scent Xpressio",
//     category: "fragrances",
//     imageSrc: "https://i.dummyjson.com/data/products/13/imageSrc.webp",
//     images: [
//       "https://i.dummyjson.com/data/products/13/1.jpg",
//       "https://i.dummyjson.com/data/products/13/2.png",
//       "https://i.dummyjson.com/data/products/13/3.jpg",
//       "https://i.dummyjson.com/data/products/13/4.jpg",
//       "https://i.dummyjson.com/data/products/13/imageSrc.webp",
//     ],
//   },
//   {
//     id: 14,
//     title: "Non-Alcoholic Concentrated Perfume Oil",
//     description:
//       "Original Al Munakh® by Mahal Al Musk | Our Impression of Climate | 6ml Non-Alcoholic Concentrated Perfume Oil",
//     price: 120,
//     discountPercentage: 15.6,
//     rating: 4.21,
//     stock: 114,
//     brand: "Al Munakh",
//     category: "fragrances",
//     imageSrc: "https://i.dummyjson.com/data/products/14/imageSrc.jpg",
//     images: [
//       "https://i.dummyjson.com/data/products/14/1.jpg",
//       "https://i.dummyjson.com/data/products/14/2.jpg",
//       "https://i.dummyjson.com/data/products/14/3.jpg",
//       "https://i.dummyjson.com/data/products/14/imageSrc.jpg",
//     ],
//   },
//   {
//     id: 15,
//     title: "Eau De Perfume Spray",
//     description:
//       "Genuine  Al-Rehab spray perfume from UAE/Saudi Arabia/Yemen High Quality",
//     price: 30,
//     discountPercentage: 10.99,
//     rating: 4.7,
//     stock: 105,
//     brand: "Lord - Al-Rehab",
//     category: "fragrances",
//     imageSrc: "https://i.dummyjson.com/data/products/15/imageSrc.jpg",
//     images: [
//       "https://i.dummyjson.com/data/products/15/1.jpg",
//       "https://i.dummyjson.com/data/products/15/2.jpg",
//       "https://i.dummyjson.com/data/products/15/3.jpg",
//       "https://i.dummyjson.com/data/products/15/4.jpg",
//       "https://i.dummyjson.com/data/products/15/imageSrc.jpg",
//     ],
//   },
//   {
//     id: 16,
//     title: "Hyaluronic Acid Serum",
//     description:
//       "L'OrÃ©al Paris introduces Hyaluron Expert Replumping Serum formulated with 1.5% Hyaluronic Acid",
//     price: 19,
//     discountPercentage: 13.31,
//     rating: 4.83,
//     stock: 110,
//     brand: "L'Oreal Paris",
//     category: "skincare",
//     imageSrc: "https://i.dummyjson.com/data/products/16/imageSrc.jpg",
//     images: [
//       "https://i.dummyjson.com/data/products/16/1.png",
//       "https://i.dummyjson.com/data/products/16/2.webp",
//       "https://i.dummyjson.com/data/products/16/3.jpg",
//       "https://i.dummyjson.com/data/products/16/4.jpg",
//       "https://i.dummyjson.com/data/products/16/imageSrc.jpg",
//     ],
//   },
//   {
//     id: 17,
//     title: "Tree Oil 30ml",
//     description:
//       "Tea tree oil contains a number of compounds, including terpinen-4-ol, that have been shown to kill certain bacteria,",
//     price: 12,
//     discountPercentage: 4.09,
//     rating: 4.52,
//     stock: 78,
//     brand: "Hemani Tea",
//     category: "skincare",
//     imageSrc: "https://i.dummyjson.com/data/products/17/imageSrc.jpg",
//     images: [
//       "https://i.dummyjson.com/data/products/17/1.jpg",
//       "https://i.dummyjson.com/data/products/17/2.jpg",
//       "https://i.dummyjson.com/data/products/17/3.jpg",
//       "https://i.dummyjson.com/data/products/17/imageSrc.jpg",
//     ],
//   },
//   {
//     id: 18,
//     title: "Oil Free Moisturizer 100ml",
//     description:
//       "Dermive Oil Free Moisturizer with SPF 20 is specifically formulated with ceramides, hyaluronic acid & sunscreen.",
//     price: 40,
//     discountPercentage: 13.1,
//     rating: 4.56,
//     stock: 88,
//     brand: "Dermive",
//     category: "skincare",
//     imageSrc: "https://i.dummyjson.com/data/products/18/imageSrc.jpg",
//     images: [
//       "https://i.dummyjson.com/data/products/18/1.jpg",
//       "https://i.dummyjson.com/data/products/18/2.jpg",
//       "https://i.dummyjson.com/data/products/18/3.jpg",
//       "https://i.dummyjson.com/data/products/18/4.jpg",
//       "https://i.dummyjson.com/data/products/18/imageSrc.jpg",
//     ],
//   },
//   {
//     id: 19,
//     title: "Skin Beauty Serum.",
//     description:
//       "Product name: rorec collagen hyaluronic acid white face serum riceNet weight: 15 m",
//     price: 46,
//     discountPercentage: 10.68,
//     rating: 4.42,
//     stock: 54,
//     brand: "ROREC White Rice",
//     category: "skincare",
//     imageSrc: "https://i.dummyjson.com/data/products/19/imageSrc.jpg",
//     images: [
//       "https://i.dummyjson.com/data/products/19/1.jpg",
//       "https://i.dummyjson.com/data/products/19/2.jpg",
//       "https://i.dummyjson.com/data/products/19/3.png",
//       "https://i.dummyjson.com/data/products/19/imageSrc.jpg",
//     ],
//   },
//   {
//     id: 20,
//     title: "Freckle Treatment Cream- 15gm",
//     description:
//       "Fair & Clear is Pakistan's only pure Freckle cream which helpsfade Freckles, Darkspots and pigments. Mercury level is 0%, so there are no side effects.",
//     price: 70,
//     discountPercentage: 16.99,
//     rating: 4.06,
//     stock: 140,
//     brand: "Fair & Clear",
//     category: "skincare",
//     imageSrc: "https://i.dummyjson.com/data/products/20/imageSrc.jpg",
//     images: [
//       "https://i.dummyjson.com/data/products/20/1.jpg",
//       "https://i.dummyjson.com/data/products/20/2.jpg",
//       "https://i.dummyjson.com/data/products/20/3.jpg",
//       "https://i.dummyjson.com/data/products/20/4.jpg",
//       "https://i.dummyjson.com/data/products/20/imageSrc.jpg",
//     ],
//   },
//   {
//     id: 21,
//     title: "- Daal Masoor 500 grams",
//     description: "Fine quality Branded Product Keep in a cool and dry place",
//     price: 20,
//     discountPercentage: 4.81,
//     rating: 4.44,
//     stock: 133,
//     brand: "Saaf & Khaas",
//     category: "groceries",
//     imageSrc: "https://i.dummyjson.com/data/products/21/imageSrc.png",
//     images: [
//       "https://i.dummyjson.com/data/products/21/1.png",
//       "https://i.dummyjson.com/data/products/21/2.jpg",
//       "https://i.dummyjson.com/data/products/21/3.jpg",
//     ],
//   },
//   {
//     id: 22,
//     title: "Elbow Macaroni - 400 gm",
//     description: "Product details of Bake Parlor Big Elbow Macaroni - 400 gm",
//     price: 14,
//     discountPercentage: 15.58,
//     rating: 4.57,
//     stock: 146,
//     brand: "Bake Parlor Big",
//     category: "groceries",
//     imageSrc: "https://i.dummyjson.com/data/products/22/imageSrc.jpg",
//     images: [
//       "https://i.dummyjson.com/data/products/22/1.jpg",
//       "https://i.dummyjson.com/data/products/22/2.jpg",
//       "https://i.dummyjson.com/data/products/22/3.jpg",
//     ],
//   },
//   {
//     id: 23,
//     title: "Orange Essence Food Flavou",
//     description:
//       "Specifications of Orange Essence Food Flavour For Cakes and Baking Food Item",
//     price: 14,
//     discountPercentage: 8.04,
//     rating: 4.85,
//     stock: 26,
//     brand: "Baking Food Items",
//     category: "groceries",
//     imageSrc: "https://i.dummyjson.com/data/products/23/imageSrc.jpg",
//     images: [
//       "https://i.dummyjson.com/data/products/23/1.jpg",
//       "https://i.dummyjson.com/data/products/23/2.jpg",
//       "https://i.dummyjson.com/data/products/23/3.jpg",
//       "https://i.dummyjson.com/data/products/23/4.jpg",
//       "https://i.dummyjson.com/data/products/23/imageSrc.jpg",
//     ],
//   },
//   {
//     id: 24,
//     title: "cereals muesli fruit nuts",
//     description:
//       "original fauji cereal muesli 250gm box pack original fauji cereals muesli fruit nuts flakes breakfast cereal break fast faujicereals cerels cerel foji fouji",
//     price: 46,
//     discountPercentage: 16.8,
//     rating: 4.94,
//     stock: 113,
//     brand: "fauji",
//     category: "groceries",
//     imageSrc: "https://i.dummyjson.com/data/products/24/thumbnail.pg",
//     images: [
//       "https://i.dummyjson.com/data/products/24/1.jpg",
//       "https://i.dummyjson.com/data/products/24/2.jpg",
//       "https://i.dummyjson.com/data/products/24/3.jpg",
//       "https://i.dummyjson.com/data/products/24/4.jpg",
//       "https://i.dummyjson.com/data/products/24/imageSrc.jpg",
//     ],
//   },
//   {
//     id: 25,
//     title: "Gulab Powder 50 Gram",
//     description: "Dry Rose Flower Powder Gulab Powder 50 Gram • Treats Wounds",
//     price: 70,
//     discountPercentage: 13.58,
//     rating: 4.87,
//     stock: 47,
//     brand: "Dry Rose",
//     category: "groceries",
//     imageSrc: "https://i.dummyjson.com/data/products/25/thumbnail.jpg",
//     images: [
//       "https://i.dummyjson.com/data/products/25/1.png",
//       "https://i.dummyjson.com/data/products/25/2.jpg",
//       "https://i.dummyjson.com/data/products/25/3.png",
//       "https://i.dummyjson.com/data/products/25/4.jpg",
//       "https://i.dummyjson.com/data/products/25/imageSrc.jpg",
//     ],
//   },
//   {
//     id: 26,
//     title: "Plant Hanger For Home",
//     description:
//       "Boho Decor Plant Hanger For Home Wall Decoration Macrame Wall Hanging Shelf",
//     price: 41,
//     discountPercentage: 17.86,
//     rating: 4.08,
//     stock: 131,
//     brand: "Boho Decor",
//     category: "home-decoration",
//     imageSrc: "https://i.dummyjson.com/data/products/26/thumbnail.jpg",
//     images: [
//       "https://i.dummyjson.com/data/products/26/1.jpg",
//       "https://i.dummyjson.com/data/products/26/2.jpg",
//       "https://i.dummyjson.com/data/products/26/3.jpg",
//       "https://i.dummyjson.com/data/products/26/4.jpg",
//       "https://i.dummyjson.com/data/products/26/5.jpg",
//       "https://i.dummyjson.com/data/products/26/imageSrc.jpg",
//     ],
//   },
//   {
//     id: 27,
//     title: "Flying Wooden Bird",
//     description:
//       "Package Include 6 Birds with Adhesive Tape Shape: 3D Shaped Wooden Birds Material: Wooden MDF, Laminated 3.5mm",
//     price: 51,
//     discountPercentage: 15.58,
//     rating: 4.41,
//     stock: 17,
//     brand: "Flying Wooden",
//     category: "home-decoration",
//     imageSrc: "https://i.dummyjson.com/data/products/27/thumbnail.webp",
//     images: [
//       "https://i.dummyjson.com/data/products/27/1.jpg",
//       "https://i.dummyjson.com/data/products/27/2.jpg",
//       "https://i.dummyjson.com/data/products/27/3.jpg",
//       "https://i.dummyjson.com/data/products/27/4.jpg",
//       "https://i.dummyjson.com/data/products/27/imageSrc.webp",
//     ],
//   },
//   {
//     id: 28,
//     title: "3D Embellishment Art Lamp",
//     description:
//       "3D led lamp sticker Wall sticker 3d wall art light on/off button  cell operated (included)",
//     price: 20,
//     discountPercentage: 16.49,
//     rating: 4.82,
//     stock: 54,
//     brand: "LED Lights",
//     category: "home-decoration",
//     imageSrc: "https://i.dummyjson.com/data/products/28/thumbnail.jpg",
//     images: [
//       "https://i.dummyjson.com/data/products/28/1.jpg",
//       "https://i.dummyjson.com/data/products/28/2.jpg",
//       "https://i.dummyjson.com/data/products/28/3.png",
//       "https://i.dummyjson.com/data/products/28/4.jpg",
//       "https://i.dummyjson.com/data/products/28/imageSrc.jpg",
//     ],
//   },
//   {
//     id: 29,
//     title: "Handcraft Chinese style",
//     description:
//       "Handcraft Chinese style art luxury palace hotel villa mansion home decor ceramic vase with brass fruit plate",
//     price: 60,
//     discountPercentage: 15.34,
//     rating: 4.44,
//     stock: 7,
//     brand: "luxury palace",
//     category: "home-decoration",
//     imageSrc: "https://i.dummyjson.com/data/products/29/thumbnail.webp",
//     images: [
//       "https://i.dummyjson.com/data/products/29/1.jpg",
//       "https://i.dummyjson.com/data/products/29/2.jpg",
//       "https://i.dummyjson.com/data/products/29/3.webp",
//       "https://i.dummyjson.com/data/products/29/4.webp",
//       "https://i.dummyjson.com/data/products/29/imageSrc.webp",
//     ],
//   },
//   {
//     id: 30,
//     title: "Key Holder",
//     description:
//       "Attractive DesignMetallic materialFour key hooksReliable & DurablePremium Quality",
//     price: 30,
//     discountPercentage: 2.92,
//     rating: 4.92,
//     stock: 54,
//     brand: "Golden",
//     category: "home-decoration",
//     imageSrc: "https://i.dummyjson.com/data/products/30/imageSrc.jpg",
//     images: [
//       "https://i.dummyjson.com/data/products/30/1.jpg",
//       "https://i.dummyjson.com/data/products/30/2.jpg",
//       "https://i.dummyjson.com/data/products/30/3.jpg",
//       "https://i.dummyjson.com/data/products/30/imageSrc.jpg",
//     ],
//   },
// ];

const ProductList = () => {
  // const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const totalItems = useSelector(selectTotalItems);
  const status = useSelector(selectedStatus);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      id: "brand",
      name: "Brands",
      options: brands,
    },
  ];

  const handleFilter = (e, section, option) => {
    // e.preventDefault();
    // console.log(section,option);
    let newFilter = { ...filter };

    //TODO: On server it will support multiple categories.
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value
      );
      newFilter[section.id].splice(index, 1);
    }
    // console.log({ newFilter });
    setFilter(newFilter);
  };

  const handleSort = (e, option) => {
    const sort = { _sort: option.sort, _order: option.order };
    // console.log({ sort });
    setSort(sort);
  };

  const handlePage = (page) => {
    // console.log({ page });
    setPage(page);
  };

  useEffect(() => {
    // dispatch(fetchAllProductsAsync());
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchProductsByFilterAsync({ filter, sort, pagination }));
    //TODO: server will filter deleted products
  }, [dispatch, filter, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);

  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  return (
    <div className="bg-white max-w-9xl">
      <div>
        {/* Mobile filter dialog */}
        <MobileFilter
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          handleFilter={handleFilter}
          filters={filters}
        ></MobileFilter>

        <main className="mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between pb-6 pt-4 lg:pt-8">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold tracking-tight border-b-4 border-blue-900 pb-2 lg:pb-4 text-blue-900">
              All Products
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div className="p-2">
                  <Menu.Button className="group inline-flex justify-center text-md lg:text-2xl py-1 px-2 lg:px-4 font-normal text-gray-700 border border-gray-200 hover:text-gray-900">
                    Sort by:
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-2xl text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
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
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-md bg-white shadow-2xl  focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <p
                              onClick={(e) => handleSort(e, option)}
                              className={classNames(
                                option.current
                                  ? "font-semibold cursor-pointer text-gray-900"
                                  : "text-gray-700",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-lg cursor-pointer"
                              )}
                            >
                              {option.name}
                            </p>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 p-2 text-gray-400 hover:text-gray-500  lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8 text-blue-900"
                >
                  <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                </svg>
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-6 ">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <DesktopFilter
                handleFilter={handleFilter}
                filters={filters}
              ></DesktopFilter>

              {/* Product grid */}
              <div className="xs:col-span-2 sm:col-span-2 lg:col-span-3">
                <ProductGrid
                  products={products}
                  totalItems={totalItems}
                  status={status}
                ></ProductGrid>
              </div>
              {/* Product grid end */}
            </div>
          </section>

          {/* section of product and filters ends */}
          <Pagination
            page={page}
            setPage={setPage}
            handlePage={handlePage}
            totalItems={totalItems}
          ></Pagination>
        </main>
      </div>
    </div>
  );
};

const MobileFilter = (props) => {
  return (
    <Transition.Root show={props.mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={props.setMobileFiltersOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Filters
                </h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center border-none outline-none bg-white p-2 text-gray-400"
                  onClick={() => props.setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <ImCross className="text-xl text-gray-900" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 ">
                {props.filters.map((section) => (
                  <Disclosure as="div" key={section.id} className=" px-4 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3">
                            <span className="font-semibold text-xl text-gray-900 ">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <FaMinus className="text-xl" />
                              ) : (
                                <FaPlus className="text-xl" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className={`flex items-center ${
                                  option.label === "Category"
                                    ? "border-b border-dashed border-gray-300"
                                    : ""
                                }`}
                              >
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  onChange={(e) =>
                                    props.handleFilter(e, section, option)
                                  }
                                  className="h-4 w-4 rounded border-gray-300 text-gray-800 focus:outline-none"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 font-semibold text-lg text-gray-700"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const DesktopFilter = (props) => {
  return (
    <form className="hidden lg:block">
      {props.filters.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-dashed border-gray-300 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 ">
                  <span className="font-semibold text-xl text-gray-900">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon
                        className="h-6 w-6 font-bold"
                        aria-hidden="true"
                      />
                    ) : (
                      <PlusIcon
                        className="h-6 w-6 font-bold"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        onChange={(e) => props.handleFilter(e, section, option)}
                        className="h-4 w-4 rounded border-gray-300 text-gray-800 focus:outline-none"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-lg text-gray-700"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  );
};

const ProductGrid = (props) => {
  // console.log("In ProductGrid");
  // console.log(props.products);

  const { date, month } = getNextDatePlusFive();
  const suffix = getDaySuffix(date);

  return (
    <div className="bg-white">
      {props.status === "loading" ? (
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
      {props.products && (
        <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid xl:grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {props.products.map((product, index) => (
              <Link to={`/product-detail/${product.id}`} key={index}>
                <div key={product.id} className="group relative">
                  <div className=" aspect-h-1 aspect-w-0 w-full overflow-hidden border border-gray-300 hover:border-none bg-gray-200 lg:aspect-none h-100 lg:h-90 hover:rounded-lg hover:shadow-md">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-xl text-gray-800">
                        <div>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.title}
                        </div>
                      </h3>
                    </div>
                  </div>
                  <div className="flex flex-row mt-2">
                    <p className="text-xl sm:text-sm md:text-md lg:text-xl font-semibold text-gray-900">
                      ₹{product.discountPrice}
                    </p>
                    <p className="text-xl  sm:text-sm md:text-md lg:text-xl font-semibold text-gray-400 ml-2 line-through">
                      ₹{product.price}
                    </p>
                    <p className="text-xl sm:text-sm md:text-md lg:text-xl font-semibold  ml-2 text-green-500">
                      ({product.discountPercentage}% OFF)
                    </p>
                  </div>
                  <div className="flex flex-row mt-2">
                    <p className="text-lg sm:text-sm md:text-md lg:text-xl font-semibold text-gray-400">
                      Free delivery by {date}
                      {suffix} {month}
                    </p>
                  </div>
                  {product.deleted && (
                    <div className="mt-1">
                      <p className="text-lg font-semibold text-red-400">
                        Product deleted
                      </p>
                    </div>
                  )}
                  {product.stock <= 0 && (
                    <div className="mt-1">
                      <p className="text-lg font-semibold text-red-400">
                        Out of stock
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
