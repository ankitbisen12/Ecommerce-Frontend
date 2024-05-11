import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { loginUserAsync, selectError, selectLoggedInUser } from "./authSlice";
import { Link, Navigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const user = useSelector(selectLoggedInUser);
  // console.log(error);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <React.Fragment>
      {user && <Navigate to="/" replace={true}></Navigate>}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className=" border-2 px-4 border-gray-200 border-opacity-60  rounded-lg">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Log In to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              // action="#"
              // method="POST"
              noValidate
              onSubmit={handleSubmit((data) => {
                dispatch(
                  loginUserAsync({ email: data.email, password: data.password })
                );
                // console.log(data);
                reset();
              })}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                        message: "Email not valid",
                      },
                    })}
                    type="email"
                    className="block w-full rounded-md border-2 border-gray-300 py-1.5 px-2 outline-none text-gray-700 shadow-sm  placeholder:text-gray-400  sm:text-sm sm:leading-6"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <Link to="/forgot-password" replace={true}>
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    type="password"
                    className="block w-full rounded-md border-2 border-gray-300 py-1.5 px-2 outline-none text-gray-700 shadow-sm  placeholder:text-gray-400  sm:text-sm sm:leading-6"
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>
                {error && (
                  <p className="text-red-500">{error || error.message}</p>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-slate-900 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-slate-800"
                >
                  Log In
                </button>
              </div>
            </form>
            <p className="mt-10 mb-5 text-center text-sm text-gray-500">
              Not a member?
              <Link
                to="/signup"
                className="ml-1 font-semibold leading-6 text-gray-800 "
              >
                Create an Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
