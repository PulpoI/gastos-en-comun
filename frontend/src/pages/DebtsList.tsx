import React from 'react';

interface Debt {
  id: number;
  debtor: string;
  amount: number;
  creditor: string;
}

interface DebtsListProps {
  deudas: Debt[];
}

const DebtsList: React.FC<DebtsListProps> = ({ deudas }) => {
  return (
    <div className="max-w-md mx-auto mt-4 p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Deudas Pendientes</h2>
      <ul>
        {deudas.map((deuda) => (
          <li key={deuda.id} className="mb-2">
            {deuda.debtor} le debe ${deuda.amount} a {deuda.creditor}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DebtsList;
