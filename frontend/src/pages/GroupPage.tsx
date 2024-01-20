import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useGroups } from "../context/GroupsContext";
import Loading from "../components/Loading";
import { toast } from "react-toastify";

const GroupPage = () => {
  const { groupId } = useParams();

  const {
    getGroupExpenses,
    groupExpenses,
    groupName,
    userDetails,
    loading,
    totalExpenses,
  } = useGroups();

  useEffect(() => {
    getGroupExpenses(groupId);
  }, [groupId]);

  const currencyFormat = (value) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(value);

  function copyGroupShareLink() {
    navigator.clipboard.writeText(`http://localhost:3000/groups/${groupId}`);
    toast.success("Link copiado al portapapeles");
  }

  if (loading) return <Loading />;

  return (
    <>
      <div>
        <section className="container px-4 mx-auto">
          <div>
            <div className="sm:flex sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-x-3">
                  <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                    {groupName}
                  </h2>
                  {userDetails && userDetails.length && (
                    <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
                      {userDetails.length} miembros
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                  Todos los gastos del grupo "{groupName}""
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
                  <span>Add vendor</span>
                </button>
              </div>
            </div>
            <div className="mt-6 md:flex md:items-center md:justify-between">
              <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
                <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:bg-gray-800 dark:text-gray-300">
                  View all
                </button>
                <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
                  Monitored
                </button>
                <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
                  Unmonitored
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
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  {groupExpenses.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th
                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            scope="col"
                          >
                            <div className="flex items-center gap-x-3">
                              <button className="flex items-center gap-x-2">
                                <span>Monto</span>
                              </button>
                            </div>
                          </th>
                          <th
                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            scope="col"
                          >
                            <div className="flex items-center gap-x-3">
                              <button className="flex items-center gap-x-2">
                                <span>Descripcion</span>
                              </button>
                            </div>
                          </th>
                          <th
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            scope="col"
                          >
                            Usuario
                          </th>
                          <th
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            scope="col"
                          >
                            Fecha
                          </th>
                          <th
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            scope="col"
                          >
                            Estado
                          </th>

                          <th className="relative py-3.5 px-4" scope="col">
                            <span className="sr-only">Acciones</span>
                          </th>
                        </tr>
                      </thead>

                      {/* Data */}

                      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                        {groupExpenses &&
                          groupExpenses.map((expense: any) => (
                            <tr key={expense.id_expense}>
                              <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                <div className="inline-flex items-center gap-x-3">
                                  <span>{currencyFormat(expense.amount)}</span>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                <div className="inline-flex items-center gap-x-3">
                                  <span>{expense.description}</span>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                <div className="flex items-center gap-x-2">
                                  <img
                                    alt=""
                                    className="object-cover w-8 h-8 rounded-full"
                                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                                  />
                                  <div>
                                    <h2 className="text-sm font-medium text-gray-800 dark:text-white ">
                                      {expense.name}
                                    </h2>
                                    <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
                                      {expense.user_id}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                {new Date(expense.date).toLocaleString()}
                              </td>
                              <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                {expense.is_active ? (
                                  <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                                    <svg
                                      fill="none"
                                      height="12"
                                      viewBox="0 0 12 12"
                                      width="12"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M10 3L4.5 8.5L2 6"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                      />
                                    </svg>
                                    <h2 className="text-sm font-normal">
                                      Pago
                                    </h2>
                                  </div>
                                ) : (
                                  <div className="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
                                    <svg
                                      fill="none"
                                      height="12"
                                      viewBox="0 0 12 12"
                                      width="12"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M9 3L3 9M3 3L9 9"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                      />
                                    </svg>
                                    <h2 className="text-sm font-normal">
                                      Cancelado
                                    </h2>
                                  </div>
                                )}
                              </td>

                              {/* <td className="px-4 py-4 text-sm whitespace-nowrap">
                <div className="flex items-center gap-x-6">
                  <button className="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none">
                    Archive
                  </button>
                  <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                    Download
                  </button>
                </div>
              </td> */}
                            </tr>
                          ))}
                      </tbody>
                    </table>
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
                          No vendors found
                        </h1>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">
                          Your search “Stripe” did not match any vendors. Please
                          try again or create add a new vendor.
                        </p>
                        <div className="flex items-center mt-4 sm:mx-auto gap-x-3">
                          <button className="w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
                            Clear Search
                          </button>
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
                            <span>Add vendor</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default GroupPage;
