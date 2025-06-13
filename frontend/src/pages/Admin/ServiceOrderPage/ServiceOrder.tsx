import React, { useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Calendar,
  User,
  Wrench,
  DollarSign,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  ServiceOrderResponse,
  ServiceOrderCreate,
  ServiceOrderUpdate,
} from "../../../types/ServiceOrder/ServiceOrder";
import {
  getAllServiceOrders,
  createServiceOrder,
  updateServiceOrder,
} from "../../../api/serviceOrder.api";
import { toast } from "react-hot-toast";
import { getAllUsers } from "../../../api/user.api";
import type { UserProfile } from "../../../types/User/User";

export default function ServiceOrders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedOrder, setSelectedOrder] =
    useState<ServiceOrderResponse | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["serviceOrders"],
    queryFn: getAllServiceOrders,
  });

  const { data: users = [], isLoading: isLoadingUsers } = useQuery<
    UserProfile[]
  >({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  console.log(users);
  const createMutation = useMutation({
    mutationFn: (data: ServiceOrderCreate) => createServiceOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceOrders"] });
      toast.success("Tạo đơn dịch vụ thành công");
      setShowCreateModal(false);
    },
    onError: (error) => {
      toast.error("Không thể tạo đơn dịch vụ");
      console.error("Lỗi tạo đơn dịch vụ:", error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ServiceOrderUpdate }) =>
      updateServiceOrder(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceOrders"] });
      toast.success("Cập nhật đơn dịch vụ thành công");
      setSelectedOrder(null);
    },
    onError: (error) => {
      toast.error("Không thể cập nhật đơn dịch vụ");
      console.error("Lỗi cập nhật đơn dịch vụ:", error);
    },
  });

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.service_order_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.client?.name?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      );

    let matchesStatus = true;
    if (statusFilter === "delivered")
      matchesStatus = order.status === "DELIVERED";
    if (statusFilter === "pending")
      matchesStatus = order.status === "NOT_DELIVERED";
    if (statusFilter === "paid") matchesStatus = order.total_remaining === 0;
    if (statusFilter === "unpaid") matchesStatus = order.total_remaining > 0;

    return matchesSearch && matchesStatus;
  });

  const getDeliveryStatus = (status: string) => {
    return status === "DELIVERED"
      ? { color: "bg-green-100 text-green-800", text: "Đã giao" }
      : { color: "bg-yellow-100 text-yellow-800", text: "Đang xử lý" };
  };

  const getPaymentStatus = (remaining: number) => {
    return remaining === 0
      ? { color: "bg-green-100 text-green-800", text: "Đã thanh toán" }
      : { color: "bg-red-100 text-red-800", text: "Chưa thanh toán" };
  };

  const handleCreateOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      client_id: formData.get("client_id") as string,
      total_paid: parseFloat(formData.get("total_paid") as string) || 0,
      status: "NOT_DELIVERED",
      total_price: 0,
      total_remaining: 0,
    };
    createMutation.mutate(data);
  };

  const handleRecordPayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedOrder) return;

    const formData = new FormData(e.currentTarget);
    const paymentAmount = parseFloat(formData.get("amount") as string);

    const data = {
      total_paid: selectedOrder.total_paid + paymentAmount,
      total_remaining: selectedOrder.total_remaining - paymentAmount,
    };

    updateMutation.mutate({ id: selectedOrder.service_order_id, data });
    setShowPaymentModal(false);
  };

  const handleMarkAsDelivered = () => {
    if (!selectedOrder) return;
    updateMutation.mutate({
      id: selectedOrder.service_order_id,
      data: { status: "DELIVERED" },
    });
  };

  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex-shrink-0">
          <h1 className="text-2xl font-bold text-gray-900">Đơn Dịch Vụ</h1>
          <p className="text-gray-600">
            Quản lý đơn dịch vụ và theo dõi trạng thái
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex-shrink-0 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Tạo Đơn Dịch Vụ
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Tìm kiếm đơn dịch vụ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="delivered">Đã giao</option>
            <option value="pending">Đang xử lý</option>
            <option value="paid">Đã thanh toán</option>
            <option value="unpaid">Chưa thanh toán</option>
          </select>

          <input
            type="date"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredOrders.map((order) => {
          const deliveryStatus = getDeliveryStatus(order.status);
          const paymentStatus = getPaymentStatus(order.total_remaining);

          return (
            <div
              key={order.service_order_id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Wrench className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {order.service_order_id}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        <span className="text-gray-900">
                          {order.client?.name || ""}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(order.created_at).toLocaleDateString("vi-VN")}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${deliveryStatus.color}`}
                  >
                    {deliveryStatus.text}
                  </span>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${paymentStatus.color}`}
                  >
                    {paymentStatus.text}
                  </span>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-blue-600 hover:text-blue-900 p-2 rounded hover:bg-blue-50 transition-colors duration-150"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <span className="text-gray-600">Dịch vụ</span>
                  <span className="font-medium text-gray-900">
                    {order.service_order_details.length}
                  </span>
                </div>

                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <span className="text-gray-600">Tổng tiền</span>
                  <span className="font-medium text-gray-900">
                    {Number(order.total_price || 0).toLocaleString("vi-VN")}đ
                  </span>
                </div>

                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <span className="text-gray-600">Đã thanh toán</span>
                  <span className="font-medium text-emerald-600">
                    {Number(order.total_paid || 0).toLocaleString("vi-VN")}đ
                  </span>
                </div>

                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <span className="text-gray-600">Còn lại</span>
                  <span
                    className={`font-medium ${
                      order.total_remaining > 0
                        ? "text-red-600"
                        : "text-emerald-600"
                    }`}
                  >
                    {Number(order.total_remaining || 0).toLocaleString("vi-VN")}
                    đ
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {selectedOrder.service_order_id}
                  </h2>
                  <p className="text-gray-600">
                    {selectedOrder.client?.name || ""} •{" "}
                    {selectedOrder.client?.email || ""}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Đặt hàng vào{" "}
                    {new Date(selectedOrder.created_at).toLocaleDateString(
                      "vi-VN"
                    )}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Services */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Dịch vụ
                  </h3>

                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    <table className="min-w-full">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Dịch vụ
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Giá cơ bản
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Chi phí phát sinh
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Số lượng
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Tổng tiền
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {selectedOrder.service_order_details.map((detail) => (
                          <tr
                            key={`${detail.service_order_id}-${detail.service_id}`}
                          >
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {detail.service?.name}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {Number(
                                detail.service?.base_price || 0
                              ).toLocaleString("vi-VN")}
                              đ
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {Number(detail.extra_price || 0).toLocaleString(
                                "vi-VN"
                              )}
                              đ
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {detail.quantity}
                            </td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">
                              {Number(detail.total_price || 0).toLocaleString(
                                "vi-VN"
                              )}
                              đ
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Payment Summary */}
                <div className="border-t pt-4">
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        Tổng chi phí dịch vụ:
                      </span>
                      <span className="font-medium text-gray-900">
                        {Number(selectedOrder.total_price || 0).toLocaleString(
                          "vi-VN"
                        )}
                        đ
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Đã thanh toán:</span>
                      <span className="font-medium text-emerald-600">
                        {Number(selectedOrder.total_paid || 0).toLocaleString(
                          "vi-VN"
                        )}
                        đ
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-t pt-3">
                      <span className="text-lg font-medium text-gray-900">
                        Số tiền còn lại:
                      </span>
                      <span
                        className={`text-lg font-bold ${
                          selectedOrder.total_remaining > 0
                            ? "text-red-600"
                            : "text-emerald-600"
                        }`}
                      >
                        {Number(
                          selectedOrder.total_remaining || 0
                        ).toLocaleString("vi-VN")}
                        đ
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 mt-4">
                    {selectedOrder.total_remaining > 0 && (
                      <button
                        onClick={() => setShowPaymentModal(true)}
                        className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
                      >
                        <DollarSign className="h-4 w-4 mr-2" />
                        Ghi nhận thanh toán
                      </button>
                    )}

                    <button
                      onClick={handleMarkAsDelivered}
                      className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                        selectedOrder.status === "DELIVERED"
                          ? "bg-gray-100 text-gray-600 cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                      disabled={selectedOrder.status === "DELIVERED"}
                    >
                      {selectedOrder.status === "DELIVERED" ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Đã giao
                        </>
                      ) : (
                        <>
                          <Clock className="h-4 w-4 mr-2" />
                          Đánh dấu đã giao
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Ghi nhận thanh toán
              </h2>

              <form onSubmit={handleRecordPayment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số tiền thanh toán
                  </label>
                  <input
                    type="number"
                    name="amount"
                    step="1000"
                    max={selectedOrder.total_remaining}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Số tiền còn lại:{" "}
                    {Number(selectedOrder.total_remaining).toLocaleString(
                      "vi-VN"
                    )}
                    đ
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày thanh toán
                  </label>
                  <input
                    type="date"
                    name="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    defaultValue={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phương thức thanh toán
                  </label>
                  <select
                    name="method"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Chọn phương thức thanh toán...</option>
                    <option value="cash">Tiền mặt</option>
                    <option value="credit_card">Thẻ tín dụng</option>
                    <option value="bank_transfer">Chuyển khoản</option>
                    <option value="check">Séc</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ghi chú
                  </label>
                  <textarea
                    name="notes"
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ghi chú thanh toán..."
                  />
                </div>

                <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setShowPaymentModal(false)}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
                  >
                    Ghi nhận thanh toán
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Create Order Modal */}
      {showCreateModal && (
        <div className="fixed inset-0  bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Tạo đơn dịch vụ
              </h2>

              <form onSubmit={handleCreateOrder} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Khách hàng
                  </label>
                  <select
                    name="client_id"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    disabled={isLoadingUsers}
                  >
                    <option value="" disabled hidden>
                      Chọn khách hàng...
                    </option>
                    {users.map((user) => (
                      <option key={user.user_id} value={user.user_id}>
                        {user.username}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Thanh toán ban đầu
                  </label>
                  <input
                    type="number"
                    name="total_paid"
                    step="1000"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ghi chú
                  </label>
                  <textarea
                    name="notes"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ghi chú đơn dịch vụ..."
                  />
                </div>

                <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Tạo đơn dịch vụ
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
