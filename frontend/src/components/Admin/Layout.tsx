import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Bounce, ToastContainer } from "react-toastify";

export default function Layout() {
  return (
    <div className="flex">
      <Sidebar />
      <div>
        <Header />
        <Outlet />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3500}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
        transition={Bounce}
        hideProgressBar={true}
      />
    </div>
  );
}
