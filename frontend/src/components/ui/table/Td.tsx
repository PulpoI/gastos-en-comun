import { ReactNode, MouseEventHandler } from "react";

const Td = ({
  onclick,
  children,
}: {
  onclick: MouseEventHandler;
  children: ReactNode;
}) => {
  return (
    <td
      onClick={onclick}
      className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap"
    >
      {children}
    </td>
  );
};

export default Td;
