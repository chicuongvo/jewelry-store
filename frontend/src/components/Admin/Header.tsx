import { LogOut } from "lucide-react";
import { Link } from "react-router";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center space-x-4 ml-auto">
          <div className="flex items-center space-x-2">
            <Link
              to="/"
              className="text-sm font-medium text-gray-700 flex flex-row gap-2 items-center hover:text-blue-500 transition-all duration-500"
            >
              <span>Trang chủ</span>
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
