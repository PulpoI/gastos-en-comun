import { postGroupRequest } from "../services/groups";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Table from "./ui/table/Table";
import Tbody from "./ui/table/Tbody";
import Td from "./ui/table/Td";
import Th from "./ui/table/Th";
import Thead from "./ui/table/Thead";
import { useMediaQuery } from "react-responsive";

const AddGroup = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 720px)" });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    console.log(values);

    values.userId = user;
    const res = await postGroupRequest(values);

    if (!res.error) {
      toast.success(res.message);
      navigate("/grupo/" + res.groupId);
    } else {
      toast.error(res.error);
    }
  });

  return (
    <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
      <form onSubmit={onSubmit}>
        <Table>
          <Thead>
            {isMobile ? (
              <Th>Nombre, privacidad y contraseña </Th>
            ) : (
              <>
                <Th>Nombre del grupo</Th>
                <Th>Tipo</Th>
                <Th>Contraseña (opcional)</Th>
                <Th> </Th>
                <Th> </Th>
              </>
            )}
          </Thead>
          <Tbody>
            <tr className="grid md:table">
              <Td>
                <div className="pb-2">
                  <input
                    {...register("name", {
                      required: "Ingresa un nombre para el grupo",
                    })}
                    className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                    placeholder="Nombre"
                    type="text"
                    // min={1}
                  />
                  {errors.name && (
                    <span
                      role="alert"
                      className="absolute text-xs text-red-500"
                    >
                      {errors.name.message}
                    </span>
                  )}
                </div>
              </Td>

              <Td>
                <div>
                  <div className="flex justify-between pb-2">
                    <label htmlFor="registered">Público</label>
                    <input
                      {...register("isPublic", {
                        required: "Ingresá el monto",
                      })}
                      className="block mr-7 placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                      type="radio"
                      name="isPublic"
                      value="1"
                      defaultChecked
                    />
                  </div>
                  <div className="flex justify-between">
                    <label htmlFor="unregistered">Privado</label>
                    <input
                      {...register("isPublic", {
                        required: "Ingresá el monto",
                      })}
                      className="block  mr-7 placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                      type="radio"
                      name="isPublic"
                      value="0"
                    />
                  </div>
                </div>
              </Td>
              <Td>
                <div className="pb-2">
                  <input
                    {...register("password", { required: false })}
                    className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                    type="password"
                    placeholder="Contraseña (opcional)"
                  ></input>
                </div>
              </Td>
              <Td> </Td>
              <Td>
                <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Crear grupo</span>
                </button>
              </Td>
            </tr>
          </Tbody>
        </Table>
      </form>
    </div>
  );
};

export default AddGroup;
