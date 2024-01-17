import React from "react";
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <>
      <section className="bg-white dark:bg-gray-900 h-screen">
        <div className="lg:flex h-screen">
          <div className="flex items-center justify-center w-full px-6 py-8 lg:h-[32rem] lg:w-1/2">
            <div className="max-w-xl">
              <h2 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
                Calcula los gastos{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  Compartidos
                </span>
              </h2>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 lg:text-base">
                Calcular gastos compartidos nunca fue tan fácil. Podes calcular
                gastos compartidos de cualquier tipo, desde alquileres, hasta
                gastos de viajes. Agraga usuarios y comienza a calcular.
              </p>
              <div className="flex flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row">
                <Link
                  to={"/registro"}
                  className="block px-5 py-2 text-sm font-medium tracking-wider text-center text-white transition-colors duration-300 transform bg-gray-900 rounded-md hover:bg-gray-700"
                >
                  Registrate Ya
                </Link>
                <a
                  href="#"
                  className="block px-5 py-2 text-sm font-medium tracking-wider text-center text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md lg:mx-4 hover:bg-gray-300"
                >
                  Calcular Gastos
                </a>
              </div>
            </div>
          </div>
          <div className="w-full h-64 lg:w-1/2 lg:h-auto">
            <div
              className="w-full h-full bg-cover"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1508394522741-82ac9c15ba69?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=748&q=80)",
              }}
            >
              <div className="w-full h-full bg-black opacity-25" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
