import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
