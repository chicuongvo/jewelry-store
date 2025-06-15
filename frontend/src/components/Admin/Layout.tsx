import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Bounce, ToastContainer } from "react-toastify";
import ScrollToTop from "../ScrollToTop";

export default function Layout() {
  return (
    <div className="flex font-admin h-screen relative">
      <ScrollToTop />
      <Sidebar />
      <div className="w-full min-h-screen">
        <div className="sticky left-0 top-0 w-full z-1">
          <Header />
        </div>
        <div className="p-6 bg-gray-50 h-min-screen">
          <Outlet />
        </div>
      </div>
      <ToastContainer
        aria-label={""}
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
