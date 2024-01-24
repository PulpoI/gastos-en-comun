import { ReactNode } from "react";

const Table = ({ children }: { children: ReactNode }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      {children}
    </table>
  );
};

export default Table;
