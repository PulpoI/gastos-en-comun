import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useGroups } from "../context/GroupsContext";
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
    <section className="container min-h-[80vh] px-4 mx-auto mt-2 md:mt-10">
      <div>
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-x-3">
              <h1 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-white">
                Grupos de gastos
              </h1>

              <button onClick={() => setSelectGroup("userExpenses")}>
                <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
                  {groupsUser && groupsUser.length}{" "}
                  {groupsUser && groupsUser.length > 1 ? "grupos" : "grupo"}
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
        </div>
        <div className="mt-6 flex items-center justify-between">
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
          <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
            <button
              onClick={() => setSelectGroup("addGroup")}
              className={`flex items-center px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm ${
                selectGroup == "addGroup"
                  ? "bg-gray-100  dark:bg-gray-800 dark:text-gray-300"
                  : "dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
              } `}
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
              Crear grupo
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
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
