import TotalExpensesTable from "./TotalExpensesTable";
import iconUser from "../assets/img/avatar.gif";
import iconUserUnregistered from "../assets/img/icon-user.gif";
import Table from "./ui/table/Table";
import Thead from "./ui/table/Thead";
import Th from "./ui/table/Th";
import Tbody from "./ui/table/Tbody";
import Td from "./ui/table/Td";
import ModalDelete from "./ui/modal/ModalDelete";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AllGroups = ({
  groupsUser,
  currencyFormat,
  setSelectGroup,
  totalExpenses,
  averageExpense,
}) => {
  const navigate = useNavigate();

  const { user } = useAuth();
  return (
    <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
      {groupsUser && groupsUser.length ? (
        <Table>
          <Thead>
            <Th>Nombre del grupo</Th>
            {/* <Th>Estado</Th> */}
            <Th> Privacidad </Th>
            <Th> Creado por </Th>
            <Th>Fecha de creación</Th>
            <Th> </Th>
          </Thead>
          <Tbody>
            {groupsUser &&
              groupsUser.map((group: any) => (
                <tr
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                  key={group.id_group}
                >
                  <Td onclick={() => navigate("/grupo/" + group.id_group)}>
                    <div className="flex items-center gap-x-2">
                      <div>
                        <h2 className="text-sm font-medium text-gray-800 dark:text-white ">
                          {group.name}
                        </h2>
                      </div>
                    </div>
                  </Td>

                  <Td onclick={() => navigate("/grupo/" + group.id_group)}>
                    <div
                      onClick={() => navigate("/grupo/" + group.id_group)}
                      className="inline-flex items-center gap-x-3"
                    >
                      <span className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">
                        {group.is_public ? "Público" : "Privado"}
                      </span>
                    </div>
                  </Td>

                  <Td onclick={() => navigate("/grupo/" + group.id_group)}>
                    <div
                      onClick={() => navigate("/grupo/" + group.id_group)}
                      className="flex items-center gap-x-2"
                    >
                      <div>
                        <h2 className="text-sm font-medium text-gray-800 dark:text-white ">
                          {group.creator_user_id === user
                            ? group.creator_name + " (yo)"
                            : group.creator_name}
                        </h2>
                      </div>
                    </div>
                  </Td>
                  <Td onclick={() => navigate("/grupo/" + group.id_group)}>
                    <span
                      onClick={() => navigate("/grupo/" + group.id_group)}
                      className="font-normal"
                    >
                      {new Date(group.date).toLocaleTimeString("es-AR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      {" - "}
                      {new Date(group.date).toLocaleDateString("es-AR")}
                    </span>
                  </Td>
                  <Td onclick={() => setSelectGroup("allGroups")}>
                    <div className="flex items-center gap-x-6">
                      <ModalDelete
                        group={group}
                        setSelectGroup={setSelectGroup}
                        groupsUser={groupsUser}
                      />
                      {/* Buton EDITAR */}
                      {/* <button className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button> */}
                    </div>
                  </Td>
                </tr>
              ))}
          </Tbody>
        </Table>
      ) : (
        <div className="flex items-center text-center border rounded-lg h-96 dark:border-gray-700">
          <div className="flex flex-col w-full max-w-sm px-4 mx-auto">
            <div className="p-3 mx-auto text-blue-500 bg-blue-100 rounded-full dark:bg-gray-800">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 className="mt-3 text-lg text-gray-800 dark:text-white">
              No hay grupos de gastos
            </h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              En esta sección podrás ver todos los grupos de gastos a los que
              perteneces. ¡Comienza a crear los tuyos!
            </p>
            <div className="flex items-center mt-4 sm:mx-auto gap-x-3">
              {/* <button
                onClick={() => setSelectGroup("addMember")}
                className="w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
              >
                Agregar miembro
              </button> */}
              <button
                onClick={() => setSelectGroup("addGroup")}
                className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
              >
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllGroups;
