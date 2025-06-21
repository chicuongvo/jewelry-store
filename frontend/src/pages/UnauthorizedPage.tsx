import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center">
        <div className="flex justify-center mb-4">
          <ShieldAlert className="text-red-500 w-16 h-16" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          403 – Forbidden
        </h1>
        <p className="text-gray-600 mb-6">
          Bạn không có quyền truy cập vào trang này.
        </p>
        <Link
          to="/"
          className="inline-block px-5 py-2 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition"
        >
          Quay về trang chủ
        </Link>
      </div>
    </div>
  );
}
