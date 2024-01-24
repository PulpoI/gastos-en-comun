import { ReactNode } from "react";

const Thead = ({ children }: { children: ReactNode }) => {
  return (
    <thead className="bg-gray-50 dark:bg-gray-800">
      <tr>{children}</tr>
    </thead>
  );
};

export default Thead;
