import { ReactNode } from "react";

const Th = ({ children }: { children: ReactNode }) => {
  return (
    <th
      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 w-1/5"
      scope="col"
    >
      <div className="flex items-center gap-x-3">
        <button className="flex items-center gap-x-2">
          <span> {children}</span>
        </button>
      </div>
    </th>
  );
};

export default Th;
