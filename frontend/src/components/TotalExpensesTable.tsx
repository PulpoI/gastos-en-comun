import Td from "./ui/table/Td";
import Th from "./ui/table/Th";
import { useMediaQuery } from "react-responsive";

const TotalExpensesTable = ({
  currencyFormat,
  totalExpenses,
  averageExpense,
}) => {
  const isMobile = useMediaQuery({ query: "(max-width: 720px)" });
  return (
    <>
      <thead className="bg-gray-50 dark:bg-gray-800">
        <tr>
          <Th
            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
            scope="col"
          >
            <div className="flex items-center gap-x-3">
              <button className="flex items-center gap-x-2">
                <span>Gasto total</span>
              </button>
            </div>
          </Th>
          <Th
            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
            scope="col"
          >
            {totalExpenses != averageExpense ? "División de gastos" : ""}
          </Th>
          {isMobile ? (
            " "
          ) : (
            <>
              <Th> </Th>
              <Th> </Th>
              <Th> </Th>
              <Th> </Th>
            </>
          )}
        </tr>
      </thead>
      <tbody
        style={{}}
        className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 overflow-hidden"
      >
        <tr>
          <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
            <div className="inline-flex items-center gap-x-3">
              <span>
                {totalExpenses != "0" ? currencyFormat(totalExpenses) : "-"}
              </span>
            </div>
          </td>
          <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
            <div className="inline-flex items-center gap-x-3">
              <span>
                {totalExpenses != averageExpense
                  ? averageExpense != "0"
                    ? currencyFormat(averageExpense)
                    : "-"
                  : ""}
              </span>
            </div>
          </td>
          {isMobile ? (
            " "
          ) : (
            <>
              <Td> </Td>
              <Td> </Td>
              <Td> </Td>
              <Td> </Td>
            </>
          )}
        </tr>
      </tbody>
    </>
  );
};

export default TotalExpensesTable;
