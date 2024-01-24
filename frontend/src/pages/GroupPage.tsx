import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGroups } from "../context/GroupsContext";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import AllExpenses from "../components/AllExpenses";
import UserExpenses from "../components/UserExpenses";
import Reckoning from "../components/Reckoning";
import { useAuth } from "../context/AuthContext";
import AddExpense from "../components/AddExpense";
import AddMember from "../components/AddMember";

const GroupPage = () => {
  const [selectGroup, setSelectGroup] = useState("allExpenses");
  const [loading, setLoading] = useState<boolean>(true);

  const { groupId } = useParams();
  const { user } = useAuth();

  const {
    groupExpenses,
    groupUser,
    userDetails,
    message,
    totalExpenses,
    averageExpense,
    postCheckUserInGroup,
    userWithPermission,
  } = useGroups();

  useEffect(() => {
    postCheckUserInGroup(user, groupId);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [groupId, user]);

  const currencyFormat = (value) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(value);

  function copyGroupShareLink() {
    navigator.clipboard.writeText(`http://localhost:3000/groups/${groupId}`);
    toast.success("Link copiado al portapapeles");
  }

  if (loading) return <Loading type={"group"} />;

  return (
    <>
      {!userWithPermission && !groupUser.is_public ? (
        <div>
          <h1>No tienes permisos para ver este grupo</h1>
        </div>
      ) : (
        <section className="container px-4 mx-auto">
          <div>
            <div className="sm:flex sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-x-3">
                  <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                    {groupUser.name}
                  </h2>
                  {userDetails && userDetails.length && (
                    <button onClick={() => setSelectGroup("userExpenses")}>
                      <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
                        {userDetails.length}{" "}
                        {userDetails.length > 1 ? "miembros" : "miembro"}
                      </span>
                    </button>
                  )}
                  <a
                    className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500"
                    role="button"
                    tabIndex="0"
                  >
                    {groupUser.is_public ? "Publico" : "Privado"}
                  </a>
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                  {selectGroup == "allExpenses" &&
                    "Todos los gastos de los miembros del grupo."}
                  {selectGroup == "userExpenses" &&
                    "Todos los miembros que pertenecen al grupo y sus gastos."}
                  {selectGroup == "reckoning" &&
                    "Ajuste de cuentas entre los miembros del grupo."}
                  {selectGroup == "addExpense" &&
                    "Agrega un nuevo gasto al grupo."}
                  {selectGroup == "addMember" &&
                    "Agrega un nuevo miembro al grupo. Podés invitar a un usuario registrado o crear uno nuevo."}
                </p>
              </div>
              <div className="flex items-center mt-4 gap-x-3">
                <button
                  onClick={copyGroupShareLink}
                  className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
                >
                  <svg
                    fill="none"
                    height="20"
                    viewBox="0 0 20 20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_3098_154395)">
                      <path
                        d="M13.3333 13.3332L9.99997 9.9999M9.99997 9.9999L6.66663 13.3332M9.99997 9.9999V17.4999M16.9916 15.3249C17.8044 14.8818 18.4465 14.1806 18.8165 13.3321C19.1866 12.4835 19.2635 11.5359 19.0351 10.6388C18.8068 9.7417 18.2862 8.94616 17.5555 8.37778C16.8248 7.80939 15.9257 7.50052 15 7.4999H13.95C13.6977 6.52427 13.2276 5.61852 12.5749 4.85073C11.9222 4.08295 11.104 3.47311 10.1817 3.06708C9.25943 2.66104 8.25709 2.46937 7.25006 2.50647C6.24304 2.54358 5.25752 2.80849 4.36761 3.28129C3.47771 3.7541 2.70656 4.42249 2.11215 5.23622C1.51774 6.04996 1.11554 6.98785 0.935783 7.9794C0.756025 8.97095 0.803388 9.99035 1.07431 10.961C1.34523 11.9316 1.83267 12.8281 2.49997 13.5832"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.67"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3098_154395">
                        <rect fill="white" height="20" width="20" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span>Compartir grupo</span>
                </button>
                <button
                  onClick={() => setSelectGroup("addMember")}
                  className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
                >
                  <span>Agregar miembro</span>
                </button>
                <button
                  onClick={() => setSelectGroup("addExpense")}
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
                  <span>Agregar gasto</span>
                </button>
              </div>
            </div>
            <div className="mt-6 md:flex md:items-center md:justify-between">
              <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
                <button
                  onClick={() => setSelectGroup("allExpenses")}
                  className={`px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm ${
                    selectGroup == "allExpenses"
                      ? "bg-gray-100  dark:bg-gray-800 dark:text-gray-300"
                      : "dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                  } `}
                >
                  Gastos
                </button>
                <button
                  onClick={() => setSelectGroup("userExpenses")}
                  className={`px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm ${
                    selectGroup == "userExpenses"
                      ? "bg-gray-100  dark:bg-gray-800 dark:text-gray-300"
                      : "dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                  } `}
                >
                  Miembros
                </button>
                <button
                  onClick={() => setSelectGroup("reckoning")}
                  className={`px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm ${
                    selectGroup == "reckoning"
                      ? "bg-gray-100  dark:bg-gray-800 dark:text-gray-300"
                      : "dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                  } `}
                >
                  Ajuste de cuentas
                </button>
              </div>
              <div className="relative flex items-center mt-4 md:mt-0">
                <span className="absolute">
                  <svg
                    className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600"
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
                </span>
                <input
                  className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Search"
                  type="text"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                {selectGroup == "allExpenses" && (
                  <AllExpenses
                    groupExpenses={groupExpenses}
                    currencyFormat={currencyFormat}
                    setSelectGroup={setSelectGroup}
                    totalExpenses={totalExpenses}
                    averageExpense={averageExpense}
                  />
                )}
                {selectGroup == "userExpenses" && (
                  <UserExpenses
                    userDetails={userDetails}
                    currencyFormat={currencyFormat}
                    totalExpenses={totalExpenses}
                    averageExpense={averageExpense}
                  />
                )}
                {selectGroup == "reckoning" && (
                  <Reckoning
                    message={message}
                    currencyFormat={currencyFormat}
                    totalExpenses={totalExpenses}
                    averageExpense={averageExpense}
                    setSelectGroup={setSelectGroup}
                  />
                )}
                {selectGroup == "addExpense" && (
                  <AddExpense
                    groupId={groupId}
                    setSelectGroup={setSelectGroup}
                  />
                )}
                {selectGroup == "addMember" && <AddMember />}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default GroupPage;
