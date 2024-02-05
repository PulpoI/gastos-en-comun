import { useParams } from "react-router-dom";
import { useGroups } from "../../../context/GroupsContext";
import { postGenerateHistoryExpensesRequest } from "../../../services/expenses";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";

const CloseExpenses = ({ setSelectGroup = null as any }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { groupId } = useParams() as any;
  const { user } = useAuth();
  const { getGroupExpenses, getHistoryExpenses } = useGroups();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {}, []);

  async function generateHistoryExepnses(groupId: string, user: string) {
    const res = await postGenerateHistoryExpensesRequest(groupId, user);
    if (!res.error) {
      toast.success(res.message);
      getGroupExpenses(groupId);
      getHistoryExpenses(groupId);
      setSelectGroup("history");
      closeModal();
    } else {
      toast.error(res.error);
      getGroupExpenses(groupId);
      closeModal();
    }
  }

  return (
    <>
      <button
        onClick={openModal}
        className="px-5 py-2 md:py-4 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm flex dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
      >
        <span>Cerrar gastos</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-30 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          {/* ... Modal Content ... */}
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* ... Modal Content ... */}
            <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-gray-900 sm:my-16 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
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
                    className="text-lg font-medium leading-6 text-gray-800 dark:text-white"
                    id="modal-title"
                  >
                    ¿Estás seguro?
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Se eliminarán todos los gastos de este grupo y se creará un
                    historial de gastos. Los miembros del grupo podrán seguir
                    viendo los historiales guardados.
                  </p>
                </div>
              </div>

              <div className="mt-5 sm:flex sm:items-center sm:justify-center">
                <div className="sm:flex sm:items-center gap-5">
                  <button
                    onClick={closeModal}
                    className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto  dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                  >
                    Cancelar
                  </button>

                  <button
                    onClick={() => {
                      generateHistoryExepnses(groupId, user);
                    }}
                    className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white transition-colors duration-300 transform bg-blue-600 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  >
                    Cerrar y guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CloseExpenses;
