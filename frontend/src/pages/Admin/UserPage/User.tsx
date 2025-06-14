import { useState } from "react";
import {
  Search,
  Shield,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  Ban,
} from "lucide-react";

import type { UserProfile } from "@/types/User/User";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { banUser, getAllUsers } from "@/api/user.api";
import { toast } from "react-toastify";
import { Pagination } from "antd";

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [verifiedFilter, setVerifiedFilter] = useState("");
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const [deleting, setDeleting] = useState({} as unknown as UserProfile);

  const limit = 2;
  console.log(page);

  const { data, isLoading } = useQuery({
    queryKey: ["users", page],
    queryFn: () => getAllUsers({ page, limit }),
  });

  const usersData = data?.data;
  const totalItems = data?.totalItems;
  const totalPages = data?.totalPages;
  console.log(usersData);

  if (page < totalPages) {
    queryClient.prefetchQuery({
      queryKey: ["users", page + 1],
      queryFn: () => getAllUsers({ page: page + 1, limit }),
    });
  }

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["users", page - 1],
      queryFn: () => getAllUsers({ page: page - 1, limit }),
    });

  const filteredUsers = usersData?.filter((user: UserProfile) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !roleFilter || user.role === roleFilter;
    const matchesVerified =
      !verifiedFilter ||
      (verifiedFilter === "verified" && user.is_verified) ||
      (verifiedFilter === "unverified" && !user.is_verified);

    return matchesSearch && matchesRole && matchesVerified;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Người dùng</h1>
          <p className="text-gray-600">Quản lý tài khoản và quyền người dùng</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Tìm kiếm người dùng..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Tất cả vai trò</option>
            <option value="USER">Người dùng</option>
            <option value="ADMIN">Quản trị viên</option>
          </select>

          <select
            value={verifiedFilter}
            onChange={e => setVerifiedFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="verified">Đã xác thực</option>
            <option value="unverified">Chưa xác thực</option>
          </select>

          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200">
              Xuất dữ liệu
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Người dùng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Liên hệ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vai trò
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Đơn hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <TableSkeleton />
              ) : (
                filteredUsers?.map((user: UserProfile) => (
                  <tr
                    key={user.user_id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {user.username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {user.username}
                          </div>
                          <div className="text-sm text-gray-500">
                            Ngày tạo:{" "}
                            {new Date(user.created_at).toLocaleString("vn-VN", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 flex items-center">
                        <Mail className="h-3 w-3 mr-1 text-gray-400" />
                        {user.email}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <Phone className="h-3 w-3 mr-1 text-gray-400" />
                        {user.phone_number}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                          user.role === "ADMIN"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <Shield className="h-3 w-3 mr-1" />
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {user.is_verified ? (
                          <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600 mr-1" />
                        )}
                        <span
                          className={`text-sm ${
                            user.is_verified ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {user.is_verified ? "Đã xác thực" : "Chưa xác thực"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">
                        {/* {user.ordersCount || 0} */} 0
                      </div>
                      <div className="text-xs text-gray-500">tổng đơn hàng</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        {user.is_banned ? (
                          <p>Đã bị cấm</p>
                        ) : (
                          <button
                            onClick={() => setDeleting(user)}
                            className=" text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors duration-150"
                          >
                            <Ban className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        align="center"
        current={page}
        total={totalItems || 0}
        pageSize={limit}
        onChange={current => {
          console.log("Current", current);
          setPage(current);
        }}
      />

      {deleting.user_id && (
        <ConfirmModal deleting={deleting} setDeleting={setDeleting} />
      )}
    </div>
  );
}

function ConfirmModal({
  deleting,
  setDeleting,
}: {
  deleting: UserProfile;
  setDeleting: React.Dispatch<React.SetStateAction<UserProfile>>;
}) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: banUser,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success("Cấm Người dùng thành công");
      setDeleting({} as unknown as UserProfile);
    },
    onError(error) {
      toast.error(`Lỗi khi Cấm người dùng: ${error.message}`);
    },
  });

  const handleSubmit = () => {
    mutate(deleting.user_id);
  };

  return (
    <div className="fixed inset-0 bg-gray-600/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Bạn chắc chắn muốn cấm Người dùng <b>{deleting.username}</b>?
          </h2>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <button
              onClick={() => setDeleting({} as unknown as UserProfile)}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Hủy
            </button>
            <button
              onClick={handleSubmit}
              disabled={isPending}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:bg-gray-600"
            >
              {isPending ? "Đang cập nhật..." : "Cấm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableSkeleton() {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <tr key={index} className="animate-pulse">
          <td className="px-6 py-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
              <div className="ml-3 space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-3 w-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="space-y-2">
              <div className="h-4 w-40 bg-gray-200 rounded"></div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
          </td>
          <td className="px-6 py-4">
            <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
          </td>
          <td className="px-6 py-4">
            <div className="space-y-1">
              <div className="h-4 w-8 bg-gray-200 rounded"></div>
              <div className="h-3 w-20 bg-gray-200 rounded"></div>
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="flex space-x-2">
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}
