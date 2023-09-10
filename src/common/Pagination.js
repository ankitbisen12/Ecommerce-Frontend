import { ITEMS_PER_PAGE } from "../app/constant";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export function Pagination(props) {
  const totalPages = Math.ceil(props.totalItems / ITEMS_PER_PAGE);

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <div
          onClick={() =>
            props.handlePage(props.page > 1 ? props.page - 1 : props.page)
          }
          className="relative cursor-pointer inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </div>
        <div
          onClick={() =>
            props.handlePage(
              props.page < totalPages ? props.page + 1 : props.page
            )
          }
          className="relative cursor-pointer ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing
            <span className="font-medium">
              {(props.page - 1) * ITEMS_PER_PAGE + 1}
            </span>
            to
            <span className="font-medium">
              {props.page * ITEMS_PER_PAGE > props.totalItems
                ? props.totalItems
                : props.page * ITEMS_PER_PAGE}
            </span>
            of <span className="font-medium">{props.totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <div
              onClick={() =>
                props.handlePage(props.page > 1 ? props.page - 1 : props.page)
              }
              className="relative cursor-pointer inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            {Array.from({
              length: totalPages,
            }).map((el, index) => (
              <div
                onClick={() => props.handlePage(index + 1)}
                aria-current="page"
                className={`relative cursor-pointer z-10 inline-flex items-center text-gray-900 ${
                  index + 1 === props.page
                    ? "bg-indigo-600 text-white"
                    : "text-gray-400"
                } px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {index + 1}
              </div>
            ))}
            <div
              onClick={() =>
                props.handlePage(
                  props.page < totalPages ? props.page + 1 : props.page
                )
              }
              className="relative cursor-pointer inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
