import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductByIdAsync,
  selectProductById,
} from "../../features/product/ProductListSlice";
import { useParams } from "react-router-dom";
import { addToCartAsync, selectItems } from "../../features/Cart/cartSlice";
import ChartModal from "../../common/ChartModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const ProductDetail = () => {
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const [openModal, setOpenModal] = useState(false);
  const product = useSelector(selectProductById);
  const items = useSelector(selectItems);
  const dispatch = useDispatch();
  const params = useParams();
  //TODO: In server data we will add colors,sizes ,highlightsetc.
  // console.log("product", product);

  const handleCart = (e) => {
    e.preventDefault();
    // console.log("Running handleCart");
    if (items.findIndex((item) => item.product.id === product.id) < 0) {
      const newItem = {
        product: product.id,
        quantity: 1,
      };
      if (selectedColor) {
        // console.log("selectedColor", selectedColor);
        newItem.color = selectedColor;
      }
      if (!selectedColor) {
        toast.error("Please select color", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }

      if (selectedSize) {
        // console.log("selectedSize", selectedSize);
        newItem.size = selectedSize;
      }
      if (!selectedSize) {
        toast.error("Please select size", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      // console.log(newItem);

      // delete newItem["id"];
      dispatch(addToCartAsync({ item: newItem, toast }));
      //TODO: It will be based on server response of backend
    } else {
      // console.log("already added");
      toast.error("already added", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  return (
    <div className="bg-white recursive-pp">
      <ToastContainer />
      {product && (
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              {product.breadcrumbs &&
                product.breadcrumbs.map((breadcrumb) => (
                  <li key={breadcrumb.id}>
                    <div className="flex items-center">
                      <a
                        href={breadcrumb.href}
                        className="mr-2 text-sm font-medium text-gray-900"
                      >
                        {breadcrumb.name}
                      </a>
                      <svg
                        width={16}
                        height={20}
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-5 w-4 text-gray-300"
                      >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                    </div>
                  </li>
                ))}
            </ol>
          </nav>

          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              <img
                src={product.images[0]}
                alt={product.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={product.images[1]}
                  alt={product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={product.images[2]}
                  alt={product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <img
                src={product.images[3]}
                alt={product.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                {product.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <div className="flex flex-row">
                <p className="text-2xl lg:text-3xl mr-2 font-semibold line-through tracking-tight text-gray-500 ">
                  ₹{product.price}
                </p>
                <p className="text-2xl lg:text-3xl mr-1 font-semibold tracking-tight text-gray-900">
                  ₹{product.discountPrice}
                </p>
                <p className="text-2xl lg:text-2xl font-semibold tracking-tight text-green-600">
                  {`(${product.discountPercentage} % OFF)`}
                </p>
              </div>

              {/* Reviews */}
              <div className="mt-4">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex flex-row items-center">
                    <StarIcon
                      className="text-gray-600 h-5 w-5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-lg font-medium text-gray-900">
                      {product.rating}{" "} rating
                    </span>
                  </div>
                </div>
              </div>
              <form className="mt-6">
                {/* Colors */}
                {product.colors && product.colors.length && (
                  <div>
                    <h3 className="text-xl font-medium text-gray-900">Color</h3>
                    <RadioGroup
                      value={selectedColor}
                      onChange={setSelectedColor}
                      className="mt-4"
                    >
                      <RadioGroup.Label className="sr-only">
                        Choose a color
                      </RadioGroup.Label>
                      <div className="flex items-center space-x-3">
                        {product.colors.map((color) => (
                          <RadioGroup.Option
                            key={color.name}
                            value={color}
                            className={({ active, checked }) =>
                              classNames(
                                color.selectedClass,
                                active && checked ? "ring ring-offset-1" : "",
                                !active && checked ? "ring-1" : "",
                                "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                              )
                            }
                          >
                            <RadioGroup.Label as="span" className="sr-only">
                              {color.name}
                            </RadioGroup.Label>
                            <span
                              aria-hidden="true"
                              className={classNames(
                                color.class,
                                "h-8 w-8 rounded-full border border-black border-opacity-10"
                              )}
                            />
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {/* Sizes */}
                {product.sizes && product.sizes.length && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between">
                      {openModal && (
                        // <Modal
                        //   cancelAction={() => {
                        //     setOpenModal(false);
                        //   }}
                        // />
                        <ChartModal
                          cancelAction={() => {
                            setOpenModal(false);
                          }}
                        />
                      )}
                      <h3 className="text-lg font-medium text-gray-900">
                        Select size
                      </h3>
                      {product.category === "tshirt" && (
                        <span
                          onClick={() => setOpenModal(true)}
                          className="text-sm font-normal text-gray-800 cursor-pointer"
                        >
                          Size guide
                        </span>
                      )}
                    </div>

                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="mt-4"
                    >
                      <RadioGroup.Label className="sr-only">
                        Choose a size
                      </RadioGroup.Label>
                      <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                        {product.sizes.map((size) => (
                          <RadioGroup.Option
                            key={size.name}
                            value={size}
                            disabled={!size.inStock}
                            className={({ active }) =>
                              classNames(
                                size.inStock
                                  ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                  : "cursor-not-allowed bg-gray-50 text-gray-200",
                                active ? "" : "",
                                "group relative flex items-center justify-center rounded-none border outline-none py-3 px-4 text-base font-medium uppercase hover:bg-gray-900 hover:text-white  focus:outline-none sm:flex-1 "
                              )
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <RadioGroup.Label as="span">
                                  {size.name}
                                </RadioGroup.Label>
                                {size.inStock ? (
                                  <span
                                    className={classNames(
                                      active ? "border" : "border-2",
                                      checked
                                        ? "border-gray-500"
                                        : "border-transparent",
                                      "pointer-events-none absolute -inset-px rounded-md"
                                    )}
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                  >
                                    <svg
                                      className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                      viewBox="0 0 100 100"
                                      preserveAspectRatio="none"
                                      stroke="currentColor"
                                    >
                                      <line
                                        x1={0}
                                        y1={100}
                                        x2={100}
                                        y2={0}
                                        vectorEffect="non-scaling-stroke"
                                      />
                                    </svg>
                                  </span>
                                )}
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                )}

                <button
                  onClick={handleCart}
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-none border border-transparent bg-slate-900 px-8 py-3 text-lg font-medium text-white hover:bg-slate-800 focus:outline-none"
                >
                  Add to Cart
                </button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>
                <div className="space-y-2">
                  <p className="text-lg text-gray-600">{product.description}</p>
                </div>
              </div>

              {product.highlights && (
                <div className="mt-6">
                  <h3 className="text-xl font-medium text-gray-900">
                    Highlights
                  </h3>
                  <div className="mt-2">
                    <ul
                      role="list"
                      className="list-disc space-y-2 pl-4 text-sm"
                    >
                      {product.highlights.map((highlight) => (
                        <li key={highlight} className="text-lg text-gray-600">
                          <span className="text-gray-600">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <h2 className="text-xl font-medium text-gray-900">
                  Product Details
                </h2>

                <div className="mt-4 space-y-6">
                  <p className="text-lg text-gray-600">{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
