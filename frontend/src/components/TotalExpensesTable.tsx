const TotalExpensesTable = ({
  currencyFormat,
  totalExpenses,
  averageExpense,
}) => {
  return (
    <>
      <thead className="bg-gray-50 dark:bg-gray-800">
        <tr>
          <th
            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
            scope="col"
          >
            <div className="flex items-center gap-x-3">
              <button className="flex items-center gap-x-2">
                <span>Gasto total</span>
              </button>
            </div>
          </th>
          <th
            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
            scope="col"
          >
            {totalExpenses != averageExpense ? "Division de gastos" : ""}
          </th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
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
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </>
  );
};

export default TotalExpensesTable;
