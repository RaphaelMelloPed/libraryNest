import { Link } from "react-router-dom";

export default function ViewBooks({ id, full_name, quantity, image }) {
  return (
    <>
      <div
        className="max-w-sm bg-gray-800 border rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        style={{ width: "18rem" }}
      >
        <Link
          to={`/books/${id}`}
          className="flex justify-center pt-5"
          style={{ height: "20rem" }}
        >
          {" "}
          <img
            className="rounded-t-lg object-cover w-auto"
            src={image}
            alt=""
          />
        </Link>
        <div className="p-5">
        <Link
          to={`/books/${id}`}
          className="flex justify-center"
        >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
              {full_name}
            </h5>
          </Link>
          <p
            className={`mb-3 font-normal ${
              quantity > 0 ? "text-green-500" : "text-red-500"
            } text-gray-700 dark:text-gray-400`}
          >
            {quantity > 0 ? "In Stock" : "Out of Stock"} - Quantity: {quantity}
          </p>
          <Link
          to={`/books/${id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            About the book
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
