import React from "react";

export default function about() {
  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
          <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">
            The right place to <span className="font-extrabold">share knowledge</span>{" "}
            is here!
          </h2>
          <p className="mb-4 font-light">
            Here at Mystic Library, you can find all types of books for free. 
            We are a community with one common objective: to bring all knowledge to those who are ready to learn and share.
          </p>
          <p className="mb-4 font-medium">
            If you are interested in classic literature, fantasy, romance, horror, esoteric studies, or even want to put
            your own published book so others can learn from you, this is the right place. We hope that you share our 
            ideals and values. Welcome to the Mystic Library! 
          </p>
          <a
            href="/users/new"
            className="inline-flex items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700"
          >
            Register!
            <svg
              className="ml-1 w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
