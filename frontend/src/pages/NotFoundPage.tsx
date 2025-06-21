// pages/NotFoundPage.tsx
import { Link } from "react-router-dom";
import { Ghost } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
        <div className="flex justify-center mb-6">
          <Ghost className="text-red-500 w-16 h-16" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          404 – Not found
        </h1>
        <p className="text-gray-600 mb-6">
          Trang bạn tìm kiếm không tồn tại hoặc đã bị xoá
        </p>
        <Link
          to="/"
          className="inline-block px-5 py-2 bg-blue-500 text-white font-semibold rounded-xl  hover:bg-blue-600 transition"
        >
          Quay về trang chủ
        </Link>
      </div>
    </div>
  );
}
