import { useEffect, useState } from "react";
import Table from "./ui/table/Table";
import Tbody from "./ui/table/Tbody";
import Td from "./ui/table/Td";
import Th from "./ui/table/Th";
import Thead from "./ui/table/Thead";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useGroups } from "../context/GroupsContext";
import { toast } from "react-toastify";
import {
  postUnregisteredUserRequest,
  postUserRegisteredInGroupRequest,
  postUserUnregisteredInGroupRequest,
} from "../services/groups";

const AddMember = ({ groupId, setSelectGroup }) => {
  const [userType, setUserType] = useState("newUser");
  const [isRegistered, setIsRegistered] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();
  const { getUsersByCreatorId, usersByCreatorId, getGroupExpenses } =
    useGroups();

  const onSubmit = handleSubmit(async (values) => {
    let data = {
      adminUserId: user,
      groupId: groupId,
      userEmail: "",
      creatorUserId: user,
      name: "",
      userId: "",
    };

    if (userType == "newUser" && values.typeUser == "registered") {
      data.userEmail = values.email;
      const res = await postUserRegisteredInGroupRequest(data);
      if (!res.error) {
        toast.success(res.message);
        getGroupExpenses(groupId);
        setSelectGroup("userExpenses");
      } else {
        toast.error(res.error);
      }
    }
    if (userType == "newUser" && values.typeUser == "unregistered") {
      // data.creatorUserId = user;
      data.name = values.name;
      const res = await postUnregisteredUserRequest(data);
      if (!res.error) {
        data.userId = res.id_user;
        const res2 = await postUserUnregisteredInGroupRequest(data);
        if (!res2.error) {
          toast.success(res2.message);
          getGroupExpenses(groupId);
          setSelectGroup("userExpenses");
        } else {
          toast.error(res2.error);
        }
      }
    }
    if (userType !== "newUser") {
      data.userId = userType;
      const res = await postUserUnregisteredInGroupRequest(data);
      if (!res.error) {
        toast.success(res.message);
        getGroupExpenses(groupId);
        setSelectGroup("userExpenses");
      } else {
        toast.error(res.error);
      }
    }
    // const res = await postUserRegisteredInGroupRequest(values);
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
            {userType == "newUser" ? (
              <>
                <Th>Tipo</Th>
                {isRegistered ? <Th>Email</Th> : <Th>Nombre</Th>}
              </>
            ) : (
              <>
                <Th> </Th>
                <Th> </Th>
              </>
            )}

            <Th> </Th>
            <Th> </Th>
          </Thead>
          <Tbody>
            <tr>
              <Td>
                <div className="pb-2">
                  <select
                    onChange={(e) => setUserType(e.target.value)}
                    value={userType}
                    className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                  >
                    <option value="newUser">Nuevo miembro</option>
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
                {userType == "newUser" ? (
                  <div>
                    <div className="flex justify-between pb-2">
                      <label htmlFor="registered">Registrado</label>
                      <input
                        {...register("typeUser", {
                          required: "Ingresá el monto",
                        })}
                        className="block mr-7 placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                        type="radio"
                        name="typeUser"
                        value="registered"
                        onChange={() => setIsRegistered(true)}
                      />
                    </div>
                    <div className="flex justify-between">
                      <label htmlFor="unregistered">No registrado</label>
                      <input
                        {...register("typeUser", {
                          required: "Ingresá el monto",
                        })}
                        className="block  mr-7 placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                        type="radio"
                        name="typeUser"
                        value="unregistered"
                        onChange={() => setIsRegistered(false)}
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </Td>
              {userType == "newUser" ? (
                <Td>
                  <div className="pb-2">
                    {isRegistered ? (
                      <input
                        {...register("email", {
                          required: "Ingresá un email",
                        })}
                        className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                        placeholder="Email"
                        type="email"
                      />
                    ) : (
                      <input
                        {...register("name", {
                          required: "Ingresá un nombre",
                        })}
                        className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                        placeholder="Nombre"
                        type="text"
                        maxLength={40}
                      />
                    )}
                  </div>
                </Td>
              ) : (
                <Td> </Td>
              )}
              <Td>
                {/* <input
                  hidden
                  {...register("groupId", { required: true })}
                  value={groupId}
                  type="text"
                /> */}
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
