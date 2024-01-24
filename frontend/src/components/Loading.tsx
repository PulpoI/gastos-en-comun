const Loading = ({ type }) => {
  if (type == "group")
    return (
      <div className="flex w-full p-10 mt-20 max-w-lg mx-auto overflow-hidden bg-white rounded-lg shadow-lg animate-pulse dark:bg-gray-800">
        {/* <div className="w-1/3 bg-gray-300 dark:bg-gray-600" /> */}
        <div className="w-full p-4 md:p-4 justify-center">
          <h1 className="w-40 h-2 bg-gray-200 rounded-lg dark:bg-gray-700" />
          <p className="w-48 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
          <div className="flex mt-4 item-center gap-x-2">
            <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-700" />
            <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-700" />
            <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-700" />
            <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-700" />
            <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-700" />
          </div>
          <div className="flex justify-between mt-6 item-center">
            <h1 className="w-10 h-2 bg-gray-200 rounded-lg dark:bg-gray-700" />
            <div className="h-4 bg-gray-200 rounded-lg w-28 dark:bg-gray-700" />
          </div>
        </div>
      </div>
    );
  if (type == "groups")
    return (
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto animate-pulse">
          <h1 className="w-48 h-2 mx-auto bg-gray-200 rounded-lg dark:bg-gray-700" />
          <p className="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
          <p className="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg sm:w-80 dark:bg-gray-700" />
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="w-full ">
              <div className="w-full h-64 bg-gray-300 rounded-lg md:h-72 dark:bg-gray-600" />
              <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
              <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
            </div>
            <div className="w-full ">
              <div className="w-full h-64 bg-gray-300 rounded-lg md:h-72 dark:bg-gray-600" />
              <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
              <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
            </div>
            <div className="w-full ">
              <div className="w-full h-64 bg-gray-300 rounded-lg md:h-72 dark:bg-gray-600" />
              <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
              <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
            </div>
          </div>
        </div>
      </section>
    );
  // return (
  //   <div className="flex w-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-lg animate-pulse dark:bg-gray-800">
  //     <div className="w-1/3 bg-gray-300 dark:bg-gray-600" />
  //     <div className="w-2/3 p-4 md:p-4">
  //       <h1 className="w-40 h-2 bg-gray-200 rounded-lg dark:bg-gray-700" />
  //       <p className="w-48 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
  //       <div className="flex mt-4 item-center gap-x-2">
  //         <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-700" />
  //         <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-700" />
  //         <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-700" />
  //         <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-700" />
  //         <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-700" />
  //       </div>
  //       <div className="flex justify-between mt-6 item-center">
  //         <h1 className="w-10 h-2 bg-gray-200 rounded-lg dark:bg-gray-700" />
  //         <div className="h-4 bg-gray-200 rounded-lg w-28 dark:bg-gray-700" />
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Loading;
