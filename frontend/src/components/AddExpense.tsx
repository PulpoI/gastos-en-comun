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
import { useMediaQuery } from "react-responsive";

type Inputs = {
  amount: number;
  userId: string;
  description: string;
  groupId: string;
};

type AddExpenseProps = {
  groupId: string;
  setSelectGroup: Function;
};

const AddExpense = ({ groupId, setSelectGroup }: AddExpenseProps) => {
  const isMobile = useMediaQuery({ query: "(max-width: 720px)" });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { user } = useAuth();

  const {
    getUsersByCreatorId,
    usersByCreatorId,
    getGroupExpenses,
    userDetails,
  } = useGroups();

  const onSubmit = handleSubmit(async (values) => {
    !values.userId ? (values.userId = user) : values.userId;
    const res = await postExpenseRequest(values);
    if (!res.error) {
      toast.success(res.message);
      getGroupExpenses(groupId);
      setSelectGroup("allExpenses");
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
            {isMobile ? (
              <Th>Gasto, usuario y descripción </Th>
            ) : (
              <>
                <Th>Gasto</Th>
                <Th>Usuario</Th>
                <Th>Descripcion</Th>
                <Th> </Th>
                <Th> </Th>
              </>
            )}
          </Thead>
          <Tbody>
            <tr className="grid md:table">
              <Td onclick={() => {}}>
                <div className="pb-2">
                  <input
                    {...register("amount", {
                      required: "Ingresá el monto",
                    })}
                    className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                    placeholder="$"
                    type="number"
                    // min={1}
                  />
                  {errors.amount && (
                    <span
                      role="alert"
                      className="absolute text-xs text-red-500"
                    >
                      {errors.amount.message}
                    </span>
                  )}
                </div>
              </Td>
              <Td onclick={() => {}}>
                <div className="pb-2">
                  <select
                    {...register("userId")}
                    className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                    defaultValue={user}
                  >
                    {usersByCreatorId &&
                      usersByCreatorId
                        .filter((u: any) =>
                          userDetails.find((us: any) => us.userId === u.id_user)
                        )
                        .map((u: any) => (
                          <option key={u.id_user} value={u.id_user}>
                            {u.id_user === user ? `${u.name} (Yo)` : u.name}
                          </option>
                        ))}
                  </select>
                </div>
              </Td>
              <Td onclick={() => {}}>
                <div className="pb-2">
                  <input
                    {...register("description", {
                      required: "Ingresá una descripción",
                    })}
                    className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                    placeholder="Descripción"
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
              <Td onclick={() => {}}>
                <input
                  hidden
                  {...register("groupId", { required: true })}
                  value={groupId}
                  type="text"
                />
              </Td>
              <Td onclick={() => {}}>
                <button className="flex items-center justify-center md:w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
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
                  <span>Agregar gasto</span>
                </button>
              </Td>
            </tr>
          </Tbody>
        </Table>
      </form>
    </div>
  );
};

export default AddExpense;
