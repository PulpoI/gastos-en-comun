import TotalExpensesTable from "./TotalExpensesTable";
import Table from "./ui/table/Table";
import Thead from "./ui/table/Thead";
import Th from "./ui/table/Th";
import iconUser from "../assets/img/avatar.gif";

const UserExpenses = ({
  userDetails,
  currencyFormat,
  totalExpenses,
  averageExpense,
}) => {
  return (
    <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
      {userDetails && userDetails.length ? (
        <Table>
          <Thead>
            <Th>Gasto total</Th>
            <Th>Usuario</Th>
            <Th>A pagar</Th>
            <Th>A recibir</Th>
            <Th> </Th>
          </Thead>
          {/* Data */}

          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
            {userDetails &&
              userDetails.map((user: any) => (
                <tr key={user.userId}>
                  <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                    <div className="inline-flex items-center gap-x-3">
                      <span>
                        {user.totalExpense != "0"
                          ? currencyFormat(user.totalExpense)
                          : "-"}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                    <div className="flex items-center gap-x-2">
                      <img
                        alt=""
                        className="object-cover w-8 h-8 rounded-full"
                        src={iconUser}
                      />
                      <div>
                        <h2 className="text-sm font-medium text-gray-800 dark:text-white ">
                          {user.name}
                        </h2>
                        <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
                          {user.creator_name != user.name
                            ? `Por: ${user.creator_name}`
                            : `ID: ${user.userId}`}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                    <div className="inline-flex items-center gap-x-3">
                      <span>
                        {user.amountOwed != "0"
                          ? currencyFormat(user.amountOwed)
                          : "-"}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                    {user.amountToReceive != "0"
                      ? currencyFormat(user.amountToReceive)
                      : "-"}
                  </td>
                  <td></td>
                </tr>
              ))}
          </tbody>
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
              No vendors found
            </h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Your search “Stripe” did not match any vendors. Please try again
              or create add a new vendor.
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
  );
};

export default UserExpenses;
