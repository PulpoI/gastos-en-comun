import TotalExpensesTable from "./TotalExpensesTable";
import iconUser from "../assets/img/avatar.gif";
import Table from "./ui/table/Table";
import Thead from "./ui/table/Thead";
import Th from "./ui/table/Th";
import Tbody from "./ui/table/Tbody";
import Td from "./ui/table/Td";
import ModalComponent from "./ui/modal/ModalComponent";

const AllExpenses = ({
  groupExpenses,
  currencyFormat,
  setSelectGroup,
  totalExpenses,
  averageExpense,
}) => {
  return (
    <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
      {groupExpenses && groupExpenses.length ? (
        <Table>
          <Thead>
            <Th>Gasto</Th>
            <Th>Usuario</Th>
            <Th>Descripcion</Th>
            <Th>Hora | Fecha</Th>
            <Th>Estado</Th>
            <Th> </Th>
          </Thead>
          <Tbody>
            {groupExpenses &&
              groupExpenses.map((expense: any) => (
                <tr key={expense.id_expense}>
                  <Td>
                    <div className="inline-flex items-center gap-x-3">
                      <span>{currencyFormat(expense.amount)}</span>
                    </div>
                  </Td>
                  <Td>
                    <div className="flex items-center gap-x-2">
                      <img
                        alt=""
                        className="object-cover w-8 h-8 rounded-full"
                        src={iconUser}
                      />
                      <div>
                        <h2 className="text-sm font-medium text-gray-800 dark:text-white ">
                          {expense.name}
                        </h2>
                      </div>
                    </div>
                  </Td>
                  <Td>
                    <div className="inline-flex items-center gap-x-3">
                      <span>{expense.description}</span>
                    </div>
                  </Td>

                  <Td>
                    {new Date(expense.date).toLocaleTimeString("es-AR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {" | "}
                    {new Date(expense.date).toLocaleDateString("es-AR")}
                  </Td>
                  <Td>
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
                        <h2 className="text-sm font-normal">Pago</h2>
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
                        <h2 className="text-sm font-normal">Cancelado</h2>
                      </div>
                    )}
                  </Td>
                  <Td>
                    <div className="flex items-center gap-x-6">
                      <ModalComponent
                        expense={expense}
                        setSelectGroup={setSelectGroup}
                      />
                      <button className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
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
                      </button>
                    </div>
                  </Td>
                </tr>
              ))}
          </Tbody>

          {/* Total Expenses */}
          <TotalExpensesTable
            currencyFormat={currencyFormat}
            totalExpenses={totalExpenses}
            averageExpense={averageExpense}
          />
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
              No hay gastos activos
            </h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              En esta sección podrás ver todos los gastos que se han realizado.
              ¡Comienza a agregar los tuyos!
            </p>
            <div className="flex items-center mt-4 sm:mx-auto gap-x-3">
              <button
                onClick={() => setSelectGroup("userExpenses")}
                className="w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
              >
                Agregar miembro
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
        </div>
      )}
    </div>
  );
};

export default AllExpenses;
