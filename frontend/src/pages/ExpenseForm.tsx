import React, { useState, ChangeEvent, FormEvent } from 'react';

interface ExpenseFormProps {
  onSubmit: (expense: { description: string; amount: string }) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSubmit }) => {
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit({ description, amount });
    setDescription('');
    setAmount('');
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDescription(e.target.value);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setAmount(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-4 p-4 bg-white rounded shadow-md">
      <label className="block mb-2">
        Descripción:
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          className="form-input mt-1 block w-full"
        />
      </label>
      <label className="block mb-2">
        Cantidad:
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          className="form-input mt-1 block w-full"
        />
      </label>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Agregar Gasto
      </button>
    </form>
  );
};

export default ExpenseForm;
