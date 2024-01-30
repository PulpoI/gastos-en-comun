import { ReactNode } from "react";

const Tbody = ({ children }: { children: ReactNode }) => {
  return (
    <tbody
      style={{ scrollbarWidth: "thin" }}
      className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900"
    >
      {children}
    </tbody>
  );
};

export default Tbody;
