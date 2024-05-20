import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useState, useEffect } from "react";
import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Books", href: "/books" },
  { name: "Authors", href: "/authors" },
  { name: "Categories", href: "/categories" },
  { name: "Rents", href: "/rents" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const userDataFromStorage = localStorage.getItem("user");
    if (userDataFromStorage) {
      const parsedUserData = JSON.parse(userDataFromStorage);
      setUserData(parsedUserData);
    }
  }, []);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  return (
    <Disclosure as="nav" className={styles.navbar}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto rounded-full"
                    src="data:image/jpeg;base64,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"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) =>
                      item.name === "Rents" && userData.admin == 1 ? (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ) : userData.admin != 1 &&
                        item.name === "Rents" ? null : (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {userData.id && (
                  <>
                    <button
                      onClick={() => logout()}
                      type="button"
                      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      Logout
                    </button>
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Link
                          to={"/users"}
                          className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={userData.image}
                            alt=""
                          />
                        </Link>
                      </div>
                    </Menu>
                  </>
                )}

                {!userData && (
                  <>
                    <a
                      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      href="/users/login"
                    >
                      Login
                    </a>
                    <a
                      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      href="/users/new"
                    >
                      Register
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
