import { Link } from "react-router-dom";
import imgHero from "../assets/img/finance-app.svg";
const HomePage = () => {
  return (
    <>
      <section className="bg-white dark:bg-gray-900 py-10 sm:py-20 min-h-[78vh]">
        <div className="lg:flex container">
          <div className="flex items-center justify-start w-full py-8 lg:h-[32rem] lg:w-1/2">
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
                  Registrate
                </Link>
                <Link
                  to={"/login"}
                  className="block px-5 py-2 text-sm font-medium tracking-wider text-center text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md lg:mx-4 hover:bg-gray-300"
                >
                  Calcular Gastos
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full h-64 lg:w-1/2 lg:h-auto">
            <img src={imgHero} alt="" className="max-w-[600px]" />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
