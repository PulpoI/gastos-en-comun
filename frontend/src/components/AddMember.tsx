import { useEffect } from "react";
import Table from "./ui/table/Table";
import Tbody from "./ui/table/Tbody";
import Td from "./ui/table/Td";
import Th from "./ui/table/Th";
import Thead from "./ui/table/Thead";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useGroups } from "../context/GroupsContext";
import { postExpenseRequest } from "../services/expenses";
import { toast } from "react-toastify";

type Inputs = {
  amount: number;
  userId: string;
  description: string;
  groupId: string;
};

const AddMember = ({ groupId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { user } = useAuth();

  const { getUsersByCreatorId, usersByCreatorId } = useGroups();

  const onSubmit = handleSubmit(async (values) => {
    !values.userId ? (values.userId = user) : values.userId;
    const res = await postExpenseRequest(values);
    if (!res.error) {
      toast.success(res.message);
    } else {
      toast.error(res.error);
    }
  });

  useEffect(() => {
    getUsersByCreatorId(user);
  }, []);

  return (
    <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
      <form onSubmit={onSubmit}>
        <Table>
          <Thead>
            <Th>Usuario</Th>
            <Th>Tipo</Th>
            <Th>Nombre / Email</Th>
            <Th> </Th>
            <Th> </Th>
          </Thead>
          <Tbody>
            <tr>
              <Td>
                <div className="pb-2">
                  <select
                    {...register("userId")}
                    className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                    defaultValue={user}
                  >
                    <option value="">Agregar nuevo</option>
                    {usersByCreatorId?.map(
                      (u: any) =>
                        u.id_user !== user && (
                          <option key={u.id_user} value={u.id_user}>
                            {u.name}
                          </option>
                        )
                    )}
                  </select>
                </div>
              </Td>
              <Td>
                <div className="pb-2">
                  <label htmlFor="registered">Registrado</label>
                  <input
                    {...register("typeUser", {
                      required: "Ingresá el monto",
                    })}
                    className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                    type="radio"
                    name="typeUser"
                    value="registered"
                  />
                  <label htmlFor="unregistered">No registrado</label>
                  <input
                    {...register("typeUser", {
                      required: "Ingresá el monto",
                    })}
                    className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                    type="radio"
                    name="typeUser"
                    value="unregistered"
                  />
                </div>
              </Td>

              <Td>
                <div className="pb-2">
                  <input
                    {...register("description", {
                      required: "Ingresá una descripción",
                    })}
                    className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                    placeholder=""
                    type="text"
                    maxLength={40}
                  />
                  {errors.description && (
                    <span
                      role="alert"
                      className="absolute text-xs text-red-500"
                    >
                      {errors.description.message}
                    </span>
                  )}
                </div>
              </Td>
              <Td>
                <input
                  hidden
                  {...register("groupId", { required: true })}
                  value={groupId}
                  type="text"
                />
              </Td>
              <Td>
                <button>Agregar miembro</button>
              </Td>
            </tr>
          </Tbody>
        </Table>
      </form>
    </div>
  );
};

export default AddMember;
