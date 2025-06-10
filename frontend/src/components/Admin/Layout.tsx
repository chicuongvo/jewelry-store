import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="flex font-admin w-min-screen relative">
      <div className="sticky left-0 top-0 h-min-screen">
        <Sidebar />
      </div>
      <div className="w-full">
        <div className="sticky left-0 top-0 w-full z-500">
          <Header />
        </div>
        <div className="p-6 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
