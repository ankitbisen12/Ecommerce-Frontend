import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearSelectedproduct,
  createProductAsync,
  fetchProductByIdAsync,
  selectBrands,
  selectCategories,
  selectProductById,
  updateProductAsync,
} from "../product/ProductListSlice";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Modal from "../../common/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const colors = [
  {
    name: "White",
    class: "bg-white",
    selectedClass: "ring-gray-400",
    id: "white",
  },
  {
    name: "Gray",
    class: "bg-gray-400",
    selectedClass: "ring-gray-400",
    id: "Gray",
  },
  {
    name: "Black",
    class: "bg-gray-900",
    selectedClass: "ring-gray-900",
    id: "black",
  },
  {
    name: "Orange",
    class: "bg-orange-600",
    selectedClass: "ring-orange-600",
    id: "Orange",
  },
  {
    name: "Red",
    class: "bg-red-900",
    selectedClass: "ring-red-900",
    id: "Red",
  },
  {
    name: "Sky",
    class: "bg-sky-300",
    selectedClass: "ring-sky-300",
    id: "Sky",
  },
  {
    name: "Cyan",
    class: "bg-cyan-700",
    selectedClass: "ring-cyan-700",
    id: "Cyan",
  },
  {
    name: "Blue",
    class: "bg-blue-400",
    selectedClass: "ring-blue-400",
    id: "Blue",
  },
  {
    name: "Purple",
    class: "bg-purple-300",
    selectedClass: "ring-purple-300",
    id: "Purple",
  },
  {
    name: "Amber",
    class: "bg-amber-950",
    selectedClass: "ring-amber-950",
    id: "Amber",
  },
  {
    name: "Teal",
    class: "bg-teal-700",
    selectedClass: "ring-teal-700",
    id: "Teal",
  },
];

const sizes = [
  { name: "XXS", inStock: false, id: "xxs" },
  { name: "XS", inStock: true, id: "xs" },
  { name: "S", inStock: true, id: "s" },
  { name: "M", inStock: true, id: "m" },
  { name: "L", inStock: true, id: "l" },
  { name: "XL", inStock: true, id: "xl" },
  { name: "2XL", inStock: true, id: "2xl" },
  { name: "3XL", inStock: true, id: "3xl" },
];

// const highlights = [
//   "Hand cut and sewn locally",
//   "Dyed with our proprietary colors",
//   "Pre-washed & pre-shrunk",
//   "Ultra-soft 100% cotton",
// ];

const ProductForm = () => {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const selectedProduct = useSelector(selectProductById);
  // console.log("SelectedProduct", selectedProduct);
  const [openModal, setOpenModal] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    } else {
      dispatch(clearSelectedproduct);
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    if (selectedProduct && params.id) {
      setValue("title", selectedProduct.title);
      setValue("description", selectedProduct.description);
      setValue("price", selectedProduct.price);
      setValue("discountPercentage", selectedProduct.discountPercentage);
      setValue("thumbnail", selectedProduct.thumbnail);
      setValue("stock", selectedProduct.stock);
      setValue("image1", selectedProduct.images[0]);
      setValue("image2", selectedProduct.images[1]);
      setValue("image3", selectedProduct.images[2]);
      setValue("image4", selectedProduct.images[3]);
      setValue("brand", selectedProduct.brand);
      setValue("category", selectedProduct.category);
      let highlightt = selectedProduct.highlights.join(",");
      // console.log("Highlightt", highlightt);
      setValue("highlights", highlightt);
      setValue(
        "sizes",
        selectedProduct.sizes.map((size) => size.id)
      );
      setValue(
        "colors",
        selectedProduct.colors.map((color) => color.id)
      );
    }
  }, [selectedProduct, setValue, params.id]);

  const handleDelete = () => {
    const product = { ...selectedProduct };
    product.deleted = true;
    // console.log(product);
    dispatch(
      updateProductAsync({
        product,
        toast,
        message: "Product deleted scuccessfully",
      })
    );
    // toast.success("Product deleted scuccessfully", {
    //   position: toast.POSITION.TOP_CENTER,
    // });
  };

  return (
    <div className="mx-auto mt-4 bg-white max-w-7xl p-8 sm:px-6 lg:px-8">
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          console.log("Data inside ProductForm", data);
          const product = { ...data };
          product.images = [
            product.image1,
            product.image2,
            product.image3,
            product.thumbnail,
          ];
          product.colors = product.colors.map((color) =>
            colors.find((clr) => clr.id === color)
          );
          // console.log(product);
          product.sizes = product.sizes.map((size) =>
            sizes.find((sz) => sz.id === size)
          );
          product.highlights = product.highlights.split(",");
          product.price = +product.price;
          product.discountPercentage = +product.discountPercentage;
          product.stock = +product.stock;
          product.rating = +product.rating;
          delete product["image1"];
          delete product["image2"];
          delete product["image3"];

          if (params.id) {
            product.id = params.id;
            product.rating = selectedProduct.rating || 0;
            dispatch(
              updateProductAsync({ product, toast, message: "Product Updated" })
            );
            // toast.success("Product Updated", {
            //   position: toast.POSITION.BOTTOM_CENTER,
            // });
          } else {
            dispatch(createProductAsync({ product, toast }));

            //TODO: these alerts should check if API failed
            reset();
          }
          // console.log(product);
        })}
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-xl font-bold leading-7 text-gray-900">
              Add Product
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {selectedProduct && selectedProduct.deleted && (
                <h2 className="text-red-500 sm:col-span-6">
                  This product is deleted
                </h2>
              )}
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md pl-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      {...register("title", { required: "Title is required" })}
                      id="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    {...register("description", {
                      required: "description is required",
                    })}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Brand
                </label>
                <div className="mt-2">
                  <select
                    {...register("brand", { required: "brand is required" })}
                  >
                    <option value="">--choose brand--</option>
                    {brands.map((brand) => (
                      <option value={brand.value}>{brand.value}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Colors
                </label>
                <div className="mt-2">
                  {colors.map((color) => {
                    return (
                      <span>
                        <input
                          type="checkbox"
                          {...register("colors", {
                            required: "color is required",
                          })}
                          key={color.id}
                          value={color.id}
                        />{" "}
                        {color.name}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Sizes
                </label>
                <div className="mt-2">
                  {sizes.map((size) => {
                    return (
                      <React.Fragment>
                        <input
                          type="checkbox"
                          {...register("sizes", {
                            required: "size is required",
                          })}
                          key={size.id}
                          value={size.id}
                        />{" "}
                        {size.name}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="highlights"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Highlights (Enter all highlights separated by commas)
                </label>
                <div className="mt-2">
                  <textarea
                    id="highlights"
                    {...register("highlights", {
                      required: "Highlights is required",
                    })}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Categories
                </label>
                <div className="mt-2">
                  <select
                    {...register("category", {
                      required: "category is required",
                    })}
                  >
                    <option value="">--choose category--</option>
                    {categories.map((category) => (
                      <option value={category.value}>{category.value}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md pl-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="number"
                      {...register("price", {
                        required: "price is required",
                        min: 1,
                        max: 10000,
                      })}
                      id="price"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="discount"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Discount
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md pl-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="number"
                      {...register("discountPercentage", {
                        required: "discountPercentage is required",
                        min: 0,
                        max: 100,
                      })}
                      id="discountPercentage"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Stock
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md pl-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="number"
                      {...register("stock", {
                        required: "stock is required",
                        min: 0,
                      })}
                      id="stock"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="rating"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Rating
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md pl-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="number"
                      {...register("rating", {
                        required: "Rating is required",
                        min: 0,
                      })}
                      id="rating"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thumbnail
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md pl-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      {...register("thumbnail", {
                        required: "thumbnail is required",
                      })}
                      id="thumbnail"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="image1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 1
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md pl-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      {...register("image1", {
                        required: "image1 is required",
                      })}
                      id="image1"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="image2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 2
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md pl-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      {...register("image2", {
                        required: "image2 is required",
                      })}
                      id="image2"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="image3"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 3
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md pl-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      {...register("image3", {
                        required: "image3 is required",
                      })}
                      id="image3"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          {selectedProduct && !selectedProduct.deleted && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpenModal(true);
              }}
              className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Delete
            </button>
          )}
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
      {selectedProduct && (
        <Modal
          title={`Delete ${selectedProduct.title}`}
          message="Are you sure you want to delete this product ?"
          img={selectedProduct.imageSrc}
          dangerOption="Delete"
          cancelOption="Cancel"
          dangerAction={handleDelete}
          cancelAction={() => setOpenModal(null)}
          showModal={openModal}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default ProductForm;
