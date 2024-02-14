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
import CloseExpenses from "../components/ui/modal/CloseExpenses";
import HistoryExpenses from "../components/HistoryExpenses";
import { GiWireframeGlobe, GiPadlock, GiShare } from "react-icons/gi";
import Error404 from "../components/Error404";
import { useMediaQuery } from "react-responsive";
import { IconContext } from "react-icons";

const GroupPage = () => {
  const [selectGroup, setSelectGroup] = useState("allExpenses");
  const [loading, setLoading] = useState<boolean>(true);

  const { groupId } = useParams() as any;
  const { user } = useAuth();

  const isMobile = useMediaQuery({ query: "(max-width: 720px)" });

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

  const currencyFormat = (value: number) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(value);

  function copyGroupShareLink() {
    if (groupUser.is_public != 0) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copiado al portapapeles");
    } else {
      toast.error("No se puede compartir un grupo privado");
    }
  }

  if (loading) return <Loading type={"group"} />;

  return (
    <>
      {userWithPermission != true && groupUser.is_public != 1 ? (
        <Error404 />
      ) : (
        <section className="container min-h-[75vh] lg:min-h-[75vh] px-4 mx-auto md:mt-4 mt-2 mb-8 md:mb-24">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-x-3">
                  <h1 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-white">
                    {groupUser.name}
                  </h1>
                  {userDetails && userDetails.length && (
                    <button onClick={() => setSelectGroup("userExpenses")}>
                      <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
                        {userDetails.length}{" "}
                        {userDetails.length > 1 ? "miembros" : "miembro"}
                      </span>
                    </button>
                  )}
                  <a
                    className="px-3 py-1 text-sm font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300 rounded cursor-pointer"
                    role="button"
                  >
                    {groupUser.is_public == "1" ? (
                      <GiWireframeGlobe />
                    ) : (
                      <GiPadlock />
                    )}
                  </a>
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                  {selectGroup == "allExpenses" &&
                    "Todos los gastos de los miembros del grupo."}
                  {selectGroup == "userExpenses" &&
                    "Todos los miembros que pertenecen al grupo."}
                  {selectGroup == "reckoning" &&
                    "Ajuste de cuentas entre los miembros."}
                  {selectGroup == "addExpense" &&
                    "Agrega un nuevo gasto al grupo."}
                  {selectGroup == "addMember" &&
                    "Agrega un nuevo miembro al grupo."}
                  {selectGroup == "history" && "Historial de gastos del grupo."}
                </p>
              </div>
              <div className="items-center gap-x-3  md:flex">
                <button
                  onClick={copyGroupShareLink}
                  className="flex items-center justify-center md:px-5 py-1 md:py-2 text-xs md:text-sm text-gray-700 transition-colors duration-200 bg-white md:border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
                >
                  <IconContext.Provider value={{ size: "20px" }}>
                    <GiShare />
                  </IconContext.Provider>
                  {isMobile ? "" : <span>Compartir grupo</span>}
                </button>
              </div>
            </div>
            <div className="mt-1 md:mt-3 flex md:items-center justify-between flex-col-reverse md:flex-row">
              <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
                <button
                  onClick={() => setSelectGroup("allExpenses")}
                  className={`w-1/3 px-5 py-1 md:py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm ${
                    selectGroup == "allExpenses"
                      ? "bg-gray-100  dark:bg-gray-800 dark:text-gray-300"
                      : "dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                  } `}
                >
                  Gastos
                </button>
                <button
                  onClick={() => setSelectGroup("userExpenses")}
                  className={`w-1/3 px-5 py-1 md:py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm ${
                    selectGroup == "userExpenses"
                      ? "bg-gray-100  dark:bg-gray-800 dark:text-gray-300"
                      : "dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                  } `}
                >
                  Miembros
                </button>
                <button
                  onClick={() => setSelectGroup("reckoning")}
                  className={`w-1/3 px-5 py-1 md:py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm ${
                    selectGroup == "reckoning"
                      ? "bg-gray-100  dark:bg-gray-800 dark:text-gray-300"
                      : "dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                  } `}
                >
                  Ajuste de cuentas
                </button>
              </div>
              <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
                <button
                  onClick={() => setSelectGroup("history")}
                  className={`w-1/3 px-5 py-1 md:py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm ${
                    selectGroup == "history"
                      ? "bg-gray-100  dark:bg-gray-800 dark:text-gray-300"
                      : "dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                  } `}
                >
                  Historial
                </button>
                <button
                  onClick={() => setSelectGroup("addMember")}
                  className={`w-1/3 px-5 py-1 md:py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm flex ${
                    selectGroup == "addMember"
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
                  Agregar miembro
                </button>

                <button
                  onClick={() => setSelectGroup("addExpense")}
                  className={`w-1/3 px-5 py-1 md:py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm flex ${
                    selectGroup == "addExpense"
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
                  Agregar gasto
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
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
                    setSelectGroup={setSelectGroup}
                    groupUser={groupUser}
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
                {selectGroup == "history" && (
                  <HistoryExpenses
                    currencyFormat={currencyFormat}
                    setSelectGroup={setSelectGroup}
                  />
                )}
                {selectGroup == "addExpense" && (
                  <AddExpense
                    groupId={groupId}
                    setSelectGroup={setSelectGroup}
                  />
                )}
                {selectGroup == "addMember" && (
                  <AddMember
                    groupId={groupId}
                    setSelectGroup={setSelectGroup}
                  />
                )}
              </div>
            </div>
          </div>
          {groupExpenses && groupExpenses.length > 0 && (
            <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
              <div className="relative flex items-center sm:mt-4 md:mt-0">
                <CloseExpenses setSelectGroup={setSelectGroup} />
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default GroupPage;
