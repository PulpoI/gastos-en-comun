import { ReactNode } from "react";

const Td = ({ children }: { children: ReactNode }) => {
  return (
    <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
      {children}
    </td>
  );
};

export default Td;
