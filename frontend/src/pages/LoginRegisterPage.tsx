import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import logo2 from "../assets/img/logo-2.png";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

type LoginRegisterPageProps = {
  type: string;
};

const LoginRegisterPage = ({ type }: LoginRegisterPageProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { signup, login, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const onSubmit = handleSubmit((values) => {
    type === "login" ? login(values) : signup(values);
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/grupos");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="container flex items-start justify-center px-6 mx-auto py-10 sm:py-20">
          <form className="w-full max-w-md" onSubmit={onSubmit}>
            <div className="flex justify-center mx-auto">
              <img className="w-auto h-7 sm:h-8" src={logo2} alt="" />
            </div>
            {type === "registro" ? (
              <div className="flex items-center justify-center mt-6">
                <Link
                  to={"/login"}
                  className="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to={"/registro"}
                  className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white"
                >
                  Registro
                </Link>
              </div>
            ) : (
              <div className="flex items-center justify-center mt-6">
                <Link
                  to={"/login"}
                  className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to={"/registro"}
                  className="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300"
                >
                  Registro
                </Link>
              </div>
            )}
            {type === "registro" && (
              <>
                <div className="relative flex items-center mt-6">
                  <span className="absolute">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    {...register("name", {
                      required: "El nombre es requerido",
                    })}
                    className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Nombre de usuario"
                  />
                </div>
                {errors.name && (
                  <p role="alert" className="absolute text-xs">
                    {errors.name.message}
                  </p>
                )}
              </>
            )}
            <div className="relative flex items-center mt-6">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <input
                type="email"
                {...register("email", { required: "El email es requerido" })}
                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Correo electrónico"
              />
            </div>
            {errors.email && (
              <p role="alert" className="absolute text-xs">
                {errors.email.message}
              </p>
            )}
            <div className="relative flex items-center mt-6">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>
              <input
                type="password"
                {...register("password", {
                  required: "La contraseña es requerida",
                })}
                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Contraseña"
              />
            </div>
            {errors.password && (
              <p role="alert" className="absolute text-xs">
                {errors.password.message}
              </p>
            )}
            <div className="mt-6">
              {type === "login" ? (
                <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                  Iniciar sesión
                </button>
              ) : (
                <>
                  <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    Registrate
                  </button>
                  <div className="mt-6 text-center ">
                    <Link
                      to={"/login"}
                      className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                    >
                      ¿Tenés una cuenta?
                    </Link>
                  </div>
                </>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default LoginRegisterPage;
