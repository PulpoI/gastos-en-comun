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
import { useGroups } from "../context/GroupsContext";

const AddGroup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
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
    // <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
    //   <h2 className="text-lg font-semibold text-gray-700  dark:text-white">
    //     Nuevo grupo de gastos
    //   </h2>
    //   <form onSubmit={onSubmit}>
    //     <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
    //       <div>
    //         <label
    //           className="text-gray-700 dark:text-gray-200"
    //           htmlFor="groupname"
    //         >
    //           Nombre del grupo
    //         </label>
    //         <input
    //           {...register("name", { required: true })}
    //           className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
    //           id="groupname"
    //           type="text"
    //         />
    //       </div>
    //       <div>
    //         <label
    //           className="text-gray-700 dark:text-gray-200"
    //           htmlFor="password"
    //         >
    //           Contraseña (opcional)
    //         </label>
    //         <input
    //           {...register("password", { required: false })}
    //           className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
    //           id="password"
    //           type="password"
    //         />
    //       </div>
    //       <div>
    //         <div className="flex mb-4">
    //           <input
    //             {...register("isPublic", { required: true })}
    //             className="block mr-7 placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
    //             type="radio"
    //             name="isPublic"
    //             value="false"
    //           />
    //           <label
    //             className="text-gray-700 dark:text-gray-200"
    //             htmlFor="true"
    //           >
    //             Privado: los usuarios añadidos al grupo pueden verlo y agregar
    //             gastos.
    //           </label>
    //         </div>
    //         <div className="flex">
    //           <input
    //             {...register("isPublic", { required: true })}
    //             className="block mr-7 placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
    //             type="radio"
    //             name="isPublic"
    //             value="true"
    //             defaultChecked
    //           />
    //           <label
    //             className="text-gray-700 dark:text-gray-200"
    //             htmlFor="isPublic"
    //           >
    //             Público: podés compartir el link del grupo con cualquier persona
    //           </label>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="flex justify-end mt-6">
    //       <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
    //         Crear grupo
    //       </button>
    //     </div>
    //   </form>
    // </section>
    <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
      <form onSubmit={onSubmit}>
        <Table>
          <Thead>
            <Th>Nombre del grupo</Th>
            <Th>Tipo</Th>
            <Th>Contraseña (opcional)</Th>
            <Th> </Th>
            <Th> </Th>
          </Thead>
          <Tbody>
            <tr>
              <Td>
                <div className="pb-2">
                  <input
                    {...register("name", {
                      required: "Ingresa un nombre para el grupo",
                    })}
                    className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                    placeholder=""
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
                      value="true"
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
                      value="false"
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
                  >
                    {/* {usersByCreatorId?.map((u: any) => (
                    <option key={u.id_user} value={u.id_user}>
                      {u.id_user == user ? `${u.name} (Yo)` : u.name}
                    </option>
                  ))} */}
                  </input>
                </div>
              </Td>
              <Td>
                {/* <input
                  hidden
                  {...register("groupId", { required: true })}
                  value={groupId}
                  type="text"
                /> */}
              </Td>
              <Td>
                <button>Agregar grupo</button>
              </Td>
            </tr>
          </Tbody>
        </Table>
      </form>
    </div>
  );
};

export default AddGroup;
