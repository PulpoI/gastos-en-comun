import { useGroups } from "../../../context/GroupsContext";
import { deleteExpenseRequest } from "../../../services/expenses";
import { useState } from "react";
import { toast } from "react-toastify";

const ModalComponent = ({ expense, setSelectGroup }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { getGroupExpenses } = useGroups();
  const openModal = () => {
    setIsOpen(true);
    console.log(expense);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  async function deleteExpense(data: object) {
    data = {
      expenseId: expense.id_expense,
      userId: expense.user_id,
      groupId: expense.group_id,
    };
    let groupId = expense.group_id;
    const res = await deleteExpenseRequest(data);
    if (!res.error) {
      toast.success(res.message);
      getGroupExpenses(groupId);
      setSelectGroup("allExpenses");
    } else {
      toast.error(res.error);
    }
  }

  return (
    <div className="relative flex justify-center">
      <button
        onClick={openModal}
        className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
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
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-10 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          {/* ... Modal Content ... */}
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* ... Modal Content ... */}
            <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              {/* ... Modal Content ... */}
              <div>
                {/* ... Modal Content ... */}
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-gray-700 dark:text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                </div>

                <div className="mt-2 text-center">
                  <h3
                    className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
                    id="modal-title"
                  >
                    ¿Eliminar gasto?
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Una vez eliminado, no podrás recuperar este gasto.
                  </p>
                </div>
              </div>

              <div className="mt-5 sm:flex sm:items-center sm:justify-center">
                <div className="sm:flex sm:items-center gap-5">
                  <button
                    onClick={closeModal}
                    className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto  dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={deleteExpense}
                    className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalComponent;
