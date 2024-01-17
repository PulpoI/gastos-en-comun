import { ToastContainer, Slide } from "react-toastify";

const Notifications = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar={false}
      limit={2}
      newestOnTop={false}
      closeOnClick
      transition={Slide}
      rtl={false}
      draggable
    />
  );
};

export default Notifications;
