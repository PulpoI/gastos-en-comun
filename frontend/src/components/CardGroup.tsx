import React from "react";

const CardGroup = ({ group }) => {
  return (
    <div className="w-1/3 px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <span className="text-sm font-light text-gray-600 dark:text-gray-400">
          {group.date}
        </span>
        <a
          className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500"
          role="button"
          tabIndex="0"
        >
          {group.is_public ? "Publico" : "Privado"}
        </a>
      </div>
      <div className="mt-2">
        <a
          className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline"
          href="#"
          role="link"
          tabIndex="0"
        >
          {group.name}
        </a>
        {/* <p className="mt-2 text-gray-600 dark:text-gray-300">
                Descripcion
              </p> */}
      </div>
      <div className="flex items-center justify-between mt-4">
        <a
          className="text-blue-600 dark:text-blue-400 hover:underline"
          href="#"
          role="link"
          tabIndex="0"
        >
          Ver gastos
        </a>
        <div className="flex items-center">
          <img
            alt="avatar"
            className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
            src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80"
          />
          <a
            className="font-bold text-gray-700 cursor-pointer dark:text-gray-200"
            role="link"
            tabIndex="0"
          >
            {group.creator_user_id}
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardGroup;
