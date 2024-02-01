import Table from "./ui/table/Table";
import Thead from "./ui/table/Thead";
import Th from "./ui/table/Th";
import Tbody from "./ui/table/Tbody";
import Td from "./ui/table/Td";
import { useGroups } from "../context/GroupsContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

type HistoryExpensesProps = {
  currencyFormat: any;
  setSelectGroup: any;
};

const HistoryExpenses = ({
  currencyFormat,
  setSelectGroup,
}: HistoryExpensesProps) => {
  const { getHistoryExpenses, historyExpenses } = useGroups();

  const { groupId } = useParams<{ groupId?: string }>() as any;

  useEffect(() => {
    getHistoryExpenses(groupId);
  }, []);

  return (
    <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
      {historyExpenses && historyExpenses.length ? (
        <Table>
          <Thead>
            <Th>Fecha</Th>
            <Th>Gasto total</Th>
            <Th>Gasto por miembro</Th>
            <Th>Cantidad de miembros</Th>
            <Th> </Th>
            <Th> </Th>
          </Thead>
          <Tbody>
            {historyExpenses &&
              historyExpenses.map((history: any) => (
                <tr key={history.id_group_history}>
                  <Td onclick={() => {}}>
                    <div className="flex items-center gap-x-2">
                      <div>
                        <h2 className="text-sm font-medium text-gray-800 dark:text-white ">
                          {new Date(history.date).toLocaleDateString("es-AR")}
                          {" - "}
                          {new Date(history.date).toLocaleTimeString("es-AR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </h2>
                      </div>
                    </div>
                  </Td>
                  <Td onclick={() => {}}>
                    <div className="inline-flex items-center gap-x-3">
                      <span>
                        {currencyFormat(history.json_data.totalExpenses)}
                      </span>
                    </div>
                  </Td>
                  <Td onclick={() => {}}>
                    <div className="flex items-center gap-x-6">
                      <div>
                        <h2 className="text-sm font-medium text-gray-800 dark:text-white ">
                          {currencyFormat(history.json_data.averageExpense)}
                        </h2>
                      </div>
                    </div>
                  </Td>
                  <Td onclick={() => {}}>
                    <div className="flex items-center gap-x-6">
                      <div>
                        <h2 className="text-sm font-medium text-gray-800 dark:text-white ">
                          {history.json_data.users.length}
                        </h2>
                      </div>
                    </div>
                  </Td>

                  <Td onclick={() => {}}> </Td>
                  <Td onclick={() => {}}> </Td>
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
              No hay historial
            </h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              En esta sección podrás ver todos los historiales de gastos.
            </p>
            <div className="flex items-center mt-4 sm:mx-auto gap-x-3">
              <button
                onClick={() => setSelectGroup("addMember")}
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

export default HistoryExpenses;
