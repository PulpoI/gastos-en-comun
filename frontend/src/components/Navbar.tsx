import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import iconUser from "../assets/img/avatar.gif";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenIcon, setIsOpenIcon] = useState(false);
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();
  const navRef = React.useRef<HTMLDivElement | null>(null);

  const { logout, checkLogin } = useAuth();

  useEffect(() => {
    checkLogin();
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (event: any) => {
    if (
      navRef.current &&
      !navRef.current.contains(event.target) &&
      event.target.id !== "btn-icon"
    ) {
      setIsOpen(false);
      setIsOpenIcon(false);
    }
  };

  function logoutSession() {
    logout();
    setIsOpenIcon(false);
    setIsOpen(false);
    navigate("/login");
  }

  return (
    <nav
      ref={navRef}
      className="relative bg-white shadow dark:bg-gray-800"
      data-x-show={`{ isOpen: ${isOpen} }`}
    >
      <div className="container py-4 md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <a href="#">
            <img
              className="w-auto h-6 sm:h-7"
              src="https://merakiui.com/images/full-logo.svg"
              alt=""
            />
          </a>

          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
              aria-label="toggle menu"
            >
              {!isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div
          className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center ${
            isOpen ? "translate-x-0 opacity-100" : "opacity-0 -translate-x-full"
          }`}
        >
          <div className="flex flex-col items-center md:flex-row">
            <Link
              to={"/"}
              className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
            >
              Calcular gastos
            </Link>
            {isAuthenticated && (
              <Link
                to={"/grupos"}
                className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
              >
                Gastos
              </Link>
            )}
            <a
              className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
              href="#"
            >
              Contacto
            </a>

            {!isAuthenticated ? (
              <Link
                to={"/login"}
                className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
              >
                Iniciar sesión
              </Link>
            ) : (
              <>
                <div className="relative inline-block">
                  {/* Dropdown toggle button */}
                  <button
                    id="btn-icon"
                    onClick={() => setIsOpenIcon(!isOpenIcon)}
                    className="relative z-10 block p-2 text-gray-700 bg-white border border-transparent rounded-md dark:text-white focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:bg-gray-800 focus:outline-none"
                  >
                    <div className="flex items-center gap-x-6 md:mx-4 md:my-0">
                      <a>
                        <img
                          className="object-cover w-10 h-10 rounded-full"
                          src={iconUser}
                          alt=""
                        ></img>
                      </a>
                    </div>
                  </button>

                  {/* Dropdown menu */}
                  {isOpenIcon === true && (
                    <div
                      onClick={() => setIsOpen(false)}
                      className="absolute right-0 z-20 w-48 py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800"
                    >
                      <a
                        href="#"
                        className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        Ver perfil
                      </a>

                      <a
                        href="#"
                        className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        Configuracion
                      </a>

                      <hr className="border-gray-200 dark:border-gray-700" />

                      <a
                        href="#"
                        className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        Contactos
                      </a>

                      <a
                        href="#"
                        className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        Invitar amigos
                      </a>

                      <hr className="border-gray-200 dark:border-gray-700" />

                      <a
                        href="#"
                        className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        Ayuda
                      </a>
                      <a
                        onClick={logoutSession}
                        className="cursor-pointer block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        Cerrar sesión
                      </a>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
