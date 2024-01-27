import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useGroups } from "../context/GroupsContext";
import CardGroup from "../components/CardGroup";
import Loading from "../components/Loading";
import AddGroup from "../components/AddGroup";
import AllGroups from "../components/AllGroups";

const GroupsExpenses = () => {
  const { user } = useAuth();
  const { getGroups, groupsUser, createdGroups } = useGroups();
  const [loading, setLoading] = useState<boolean>(true);

  const [selectGroup, setSelectGroup] = useState("allGroups");

  useEffect(() => {
    getGroups(user);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);
  if (loading) return <Loading type={"groups"} />;
  return (
    <section className="container px-4 mx-auto">
      <div>
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-x-3">
              <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                Grupos de gastos
              </h2>

              <button onClick={() => setSelectGroup("userExpenses")}>
                <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
                  {groupsUser.length}{" "}
                  {groupsUser.length > 1 ? "grupos" : "grupo"}
                </span>
              </button>
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              {selectGroup == "allGroups" &&
                "Todos los grupos en lo que participas."}
              {selectGroup == "myGroups" && "Todos los grupos que creaste."}
              {selectGroup == "addGroup" && "Crea un nuevo grupo de gastos."}
              {selectGroup == "deleteGroup" &&
                "Agrega un nuevo gasto al grupo."}
              {selectGroup == "addMember" &&
                "Agrega un nuevo miembro al grupo. Podés invitar a un usuario registrado o crear uno nuevo."}
            </p>
          </div>
          <div className="flex items-center mt-4 gap-x-3">
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
        <div className="mt-6 md:flex md:items-center md:justify-between">
          <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
            <button
              onClick={() => setSelectGroup("allGroups")}
              className={`px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm ${
                selectGroup == "allGroups"
                  ? "bg-gray-100  dark:bg-gray-800 dark:text-gray-300"
                  : "dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
              } `}
            >
              Todos los grupos
            </button>
            <button
              onClick={() => setSelectGroup("myGroups")}
              className={`px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm ${
                selectGroup == "myGroups"
                  ? "bg-gray-100  dark:bg-gray-800 dark:text-gray-300"
                  : "dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
              } `}
            >
              Mis grupos
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            {selectGroup == "addGroup" && <AddGroup />}
            {selectGroup == "allGroups" && (
              <AllGroups
                groupsUser={groupsUser}
                setSelectGroup={setSelectGroup}
              />
            )}
            {selectGroup == "myGroups" && (
              <AllGroups
                groupsUser={createdGroups}
                setSelectGroup={setSelectGroup}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupsExpenses;
