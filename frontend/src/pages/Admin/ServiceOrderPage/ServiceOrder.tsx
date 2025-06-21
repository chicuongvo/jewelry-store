import React, { useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Calendar,
  User,
  Wrench,
  Trash2,
  Edit2,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Pagination } from "antd";
import type {
  ServiceOrderResponse,
  ServiceOrderCreate,
  ServiceOrderUpdate,
} from "../../../types/ServiceOrder/ServiceOrder";
import {
  getAllServiceOrders,
  createServiceOrder,
  updateServiceOrder,
  deleteServiceOrder,
} from "../../../api/serviceOrder.api";
import { getAllServices } from "../../../api/service.api";
import {
  createServiceOrderDetail,
  deleteServiceOrderDetail,
  updateServiceOrderDetail,
  getAllServiceOrderDetail,
} from "../../../api/service_order_detail.api";
import { toast } from "react-toastify";
import { getAllUsers } from "../../../api/user.api";
import type { ServiceResponse } from "../../../types/service/service";
import { useNotification } from "@/contexts/notificationContext";
import type { UserResponse } from "@/types/User/User";
import { exportToExcel } from "@/utility/exportToExcel";

export default function AdminServiceOrders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [selectedOrder, setSelectedOrder] =
    useState<ServiceOrderResponse | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingOrder, setDeletingOrder] =
    useState<ServiceOrderResponse | null>(null);
  const [editingDetail, setEditingDetail] = useState<
    ServiceOrderResponse["service_order_details"][0] | null
  >(null);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [deletingDetail, setDeletingDetail] = useState<
    ServiceOrderResponse["service_order_details"][0] | null
  >(null);
  const queryClient = useQueryClient();
  const { addNotification } = useNotification();

  const { data: orders = [], isLoading: isLoadingOrders } = useQuery({
    queryKey: ["serviceOrders"],
    queryFn: getAllServiceOrders,
  });

  const { data: users, isLoading: isLoadingUsers } = useQuery<UserResponse>({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });

  const { data: services = [], isLoading: isLoadingServices } = useQuery<
    ServiceResponse[]
  >({
    queryKey: ["services"],
    queryFn: getAllServices,
  });

  const { data: orderDetails = [], isLoading: isLoadingDetails } = useQuery({
    queryKey: ["serviceOrderDetails", selectedOrder?.service_order_id],
    queryFn: () => {
      if (!selectedOrder?.service_order_id) return Promise.resolve([]);
      return getAllServiceOrderDetail(selectedOrder.service_order_id);
    },
    enabled: !!selectedOrder?.service_order_id,
  });

  const createMutation = useMutation({
    mutationFn: (data: ServiceOrderCreate) => createServiceOrder(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["serviceOrders"] });
      toast.success("Tạo đơn dịch vụ thành công");
      addNotification(
        `Đơn dịch vụ mới ${
          response.service_order_id
        } đã được tạo cho khách hàng ${
          response.client?.username || "Chưa có thông tin"
        }.`
      );
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
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["serviceOrders"] });
      toast.success("Cập nhật đơn dịch vụ thành công");

      addNotification(
        `Đơn dịch vụ ${response.service_order_id} của khách hàng ${
          response.client?.username || "Chưa có thông tin"
        } đã được cập nhật. Tổng tiền: ${Number(
          response.total_price
        ).toLocaleString("vi-VN")}đ, Đã thanh toán: ${Number(
          response.total_paid
        ).toLocaleString("vi-VN")}đ.`
      );
    },
    onError: (error) => {
      toast.error("Không thể cập nhật đơn dịch vụ");
      console.error("Lỗi cập nhật đơn dịch vụ:", error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteServiceOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceOrders"] });
      toast.success("Xóa đơn dịch vụ thành công");
      addNotification(
        `Đơn dịch vụ ${deletingOrder?.service_order_id} của khách hàng ${
          deletingOrder?.client?.username || "Chưa có thông tin"
        } đã được xóa.`
      );
      setShowDeleteModal(false);
      setDeletingOrder(null);
    },
    onError: (error) => {
      toast.error("Không thể xóa đơn dịch vụ");
      console.error("Lỗi xóa đơn dịch vụ:", error);
    },
  });

  const addServiceDetailMutation = useMutation({
    mutationFn: (data: {
      service_order_id: string;
      service_id: string;
      service: ServiceResponse;
    }) =>
      createServiceOrderDetail({
        service_order_id: data.service_order_id,
        service_id: data.service_id,
        quantity: 1,
        extra_cost: 0,
        calculated_price: data.service.base_price,
        total_price: data.service.base_price,
        paid: Math.ceil(data.service.base_price * 0.5),
        remaining:
          data.service.base_price - Math.ceil(data.service.base_price * 0.5),
      }),
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ["serviceOrders"] });
      await queryClient.invalidateQueries({
        queryKey: ["serviceOrderDetails", selectedOrder?.service_order_id],
      });
      toast.success("Thêm dịch vụ thành công");
      addNotification(
        `Dịch vụ ${response.service?.name} đã được thêm vào đơn hàng ${
          selectedOrder?.service_order_id
        }. Giá: ${Number(response.total_price).toLocaleString(
          "vi-VN"
        )}đ, Đặt cọc: ${Number(response.paid).toLocaleString("vi-VN")}đ.`
      );
      setShowAddServiceModal(false);
    },
    onError: (error) => {
      toast.error("Không thể thêm dịch vụ");
      console.error("Lỗi thêm dịch vụ:", error.toString());
    },
  });

  const deleteDetailMutation = useMutation({
    mutationFn: ({
      service_order_id,
      service_id,
    }: {
      service_order_id: string;
      service_id: string;
    }) => deleteServiceOrderDetail({ service_order_id, service_id }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["serviceOrders"] });
      await queryClient.invalidateQueries({
        queryKey: ["serviceOrderDetails", selectedOrder?.service_order_id],
      });
      toast.success("Xóa chi tiết đơn hàng thành công");
      addNotification(
        `Dịch vụ ${deletingDetail?.service?.name} đã được xóa khỏi đơn hàng ${selectedOrder?.service_order_id}.`
      );
      setDeletingDetail(null);
    },
    onError: (error) => {
      toast.error("Không thể xóa chi tiết đơn hàng");
      console.error("Lỗi xóa chi tiết đơn hàng:", error);
    },
  });

  const updateDetailMutation = useMutation({
    mutationFn: (data: {
      service_order_id: string;
      service_id: string;
      total_price: number;
      paid: number;
      status?: string;
      extra_cost?: number;
    }) => {
      return updateServiceOrderDetail(
        {
          service_order_id: data.service_order_id,
          service_id: data.service_id,
        },
        {
          paid: data.paid,
          status: data.status,
          extra_cost: data.extra_cost,
        }
      );
    },
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ["serviceOrders"] });
      await queryClient.invalidateQueries({
        queryKey: ["serviceOrderDetails", selectedOrder?.service_order_id],
      });
      toast.success("Cập nhật chi tiết đơn hàng thành công");
      addNotification(
        `Chi tiết dịch vụ ${response.service?.name} trong đơn hàng ${
          selectedOrder?.service_order_id
        } đã được cập nhật. Tổng tiền: ${Number(
          response.total_price
        ).toLocaleString("vi-VN")}đ, Đã thanh toán: ${Number(
          response.paid
        ).toLocaleString("vi-VN")}đ, Trạng thái: ${
          response.status === "DELIVERED" ? "Đã giao" : "Đang xử lý"
        }.`
      );
      setEditingDetail(null);
    },
    onError: (error) => {
      toast.error("Không thể cập nhật chi tiết đơn hàng");
      console.error("Lỗi cập nhật chi tiết đơn hàng:", error);
    },
  });

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.service_order_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.client?.username?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      );

    let matchesStatus = true;
    if (statusFilter === "delivered")
      matchesStatus = order.status === "DELIVERED";
    if (statusFilter === "pending")
      matchesStatus = order.status === "NOT_DELIVERED";
    if (statusFilter === "paid") matchesStatus = order.total_remaining === 0;
    if (statusFilter === "unpaid") matchesStatus = order.total_remaining > 0;

    let matchesDate = true;
    if (dateFilter) {
      const orderDate = new Date(order.created_at);
      const filterDate = new Date(dateFilter);
      matchesDate = orderDate.toDateString() === filterDate.toDateString();
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  const getDeliveryStatus = (status: string) => {
    return status === "DELIVERED"
      ? { color: "bg-green-100 text-green-800", text: "Đã giao" }
      : { color: "bg-yellow-100 text-yellow-800", text: "Đang xử lý" };
  };

  const getPaymentStatus = (remaining: number) => {
    return remaining <= 0
      ? { color: "bg-green-100 text-green-800", text: "Đã thanh toán" }
      : { color: "bg-red-100 text-red-800", text: "Chưa thanh toán" };
  };

  const handleCreateOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      client_id: formData.get("client_id") as string,
      total_paid: 0,
      status: "NOT_DELIVERED",
      total_price: 0,
      total_remaining: 0,
    };
    createMutation.mutate(data);
  };

  const handleAddService = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedOrder) return;

    const formData = new FormData(e.currentTarget);
    const serviceId = formData.get("service_id") as string;
    const selectedService = services.find((s) => s.service_id === serviceId);

    if (!selectedService) {
      toast.error("Không tìm thấy dịch vụ");
      return;
    }

    addServiceDetailMutation.mutate({
      service_order_id: selectedOrder.service_order_id,
      service_id: serviceId,
      service: selectedService,
    });
  };

  const handleRecordPayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedOrder) return;

    const formData = new FormData(e.currentTarget);
    const paymentAmount = parseFloat(formData.get("amount") as string);

    const data = {
      total_paid: +selectedOrder.total_paid + paymentAmount, // Convert to number and add the payment amount to the existing selectedOrder.total_paid + paymentAmount, // Convert to number and add the payment amount to the existing totalselectedOrder.total_paid + paymentAmount,
      total_remaining: selectedOrder.total_remaining - paymentAmount,
    };

    console.log("Payment Amount:", data);
    updateMutation.mutate({ id: selectedOrder.service_order_id, data });
    setShowPaymentModal(false);
  };

  const handleDelete = (order: ServiceOrderResponse) => {
    setDeletingOrder(order);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deletingOrder) {
      deleteMutation.mutate(deletingOrder.service_order_id);
    }
  };

  const handleEditDetail = (
    detail: ServiceOrderResponse["service_order_details"][0]
  ) => {
    setEditingDetail(detail);
  };

  const handleDeleteDetail = (
    detail: ServiceOrderResponse["service_order_details"][0]
  ) => {
    setDeletingDetail(detail);
  };

  const confirmDeleteDetail = () => {
    if (deletingDetail) {
      deleteDetailMutation.mutate({
        service_order_id: deletingDetail.service_order_id,
        service_id: deletingDetail.service_id,
      });
    }
  };

  if (isLoadingOrders) {
    return (
      <div className="space-y-6">
        {/* Page Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-64 bg-gray-200 rounded mt-2 animate-pulse"></div>
          </div>
          <div className="h-10 w-40 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Search and Filters Skeleton */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Orders List Skeleton */}
        <div className="grid grid-cols-1 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                  <div>
                    <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>
                    <div className="flex items-center space-x-4">
                      <div className="h-4 w-24 bg-gray-200 rounded"></div>
                      <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-6 w-20 bg-gray-200 rounded"></div>
                  <div className="h-6 w-20 bg-gray-200 rounded"></div>
                  <div className="h-8 w-8 bg-gray-200 rounded"></div>
                  <div className="h-8 w-8 bg-gray-200 rounded"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                  <div className="h-4 w-12 bg-gray-200 rounded"></div>
                </div>
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </div>
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </div>
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="mt-6 flex justify-center">
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex-shrink-0">
          <h1 className="text-2xl font-bold text-gray-900">Đơn dịch vụ</h1>
          <p className="text-gray-600">
            Quản lý đơn dịch vụ và theo dõi trạng thái
          </p>
        </div>
        <div className="flex flex-row gap-3">
          <button
            onClick={() => exportToExcel(orders, `Danh sách phiếu dịch vụ`)}
            className="cursor-pointer px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200"
          >
            Xuất dữ liệu
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex-shrink-0 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={createMutation.isPending}
          >
            <Plus className="h-4 w-4 mr-2" />
            {createMutation.isPending ? "Đang tạo..." : "Tạo đơn dịch vụ"}
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredOrders
          .slice((currentPage - 1) * pageSize, currentPage * pageSize)
          .map((order) => {
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
                            {order.client?.username || ""}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(order.created_at).toLocaleDateString(
                            "vi-VN"
                          )}
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
                      className="text-blue-600 hover:text-blue-900 p-2 rounded hover:bg-blue-50 transition-colors duration-150 hover:cursor-pointer"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(order)}
                      className="text-red-600 hover:text-red-900 p-2 rounded hover:bg-red-50 transition-colors duration-150 hover:cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
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
                      {Number(order.total_remaining || 0).toLocaleString(
                        "vi-VN"
                      )}
                      đ
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredOrders.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-gray-600/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {selectedOrder.service_order_id}
                  </h2>
                  <p className="text-gray-600">
                    {selectedOrder.client?.username || ""} •{" "}
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
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium text-gray-900">
                      Dịch vụ
                    </h3>
                    <button
                      onClick={() => setShowAddServiceModal(true)}
                      disabled={addServiceDetailMutation.isPending}
                      className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      {addServiceDetailMutation.isPending
                        ? "Đang thêm..."
                        : "Thêm dịch vụ"}
                    </button>
                  </div>

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
                            Thành tiền
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Trả trước
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Còn lại
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Tình trạng
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Thao tác
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {isLoadingDetails ? (
                          <tr className="animate-pulse">
                            <td className="px-4 py-3">
                              <div className="h-4 bg-gray-200 rounded w-32"></div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="h-4 bg-gray-200 rounded w-24"></div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="h-4 bg-gray-200 rounded w-24"></div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="h-4 bg-gray-200 rounded w-24"></div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="h-4 bg-gray-200 rounded w-24"></div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="h-4 bg-gray-200 rounded w-24"></div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="h-6 bg-gray-200 rounded w-20"></div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-2">
                                <div className="h-8 w-8 bg-gray-200 rounded"></div>
                                <div className="h-8 w-8 bg-gray-200 rounded"></div>
                                <div className="h-8 w-24 bg-gray-200 rounded"></div>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          orderDetails.map((detail) => (
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
                                {Number(detail.extra_cost || 0).toLocaleString(
                                  "vi-VN"
                                )}
                                đ
                              </td>
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                {Number(detail.total_price || 0).toLocaleString(
                                  "vi-VN"
                                )}
                                đ
                              </td>
                              <td className="px-4 py-3 text-sm text-emerald-600">
                                {Number(detail.paid || 0).toLocaleString(
                                  "vi-VN"
                                )}
                                đ
                              </td>
                              <td className="px-4 py-3 text-sm text-red-600">
                                {Number(detail.remaining || 0).toLocaleString(
                                  "vi-VN"
                                )}
                                đ
                              </td>
                              <td className="px-4 py-3 text-sm">
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    detail.status === "DELIVERED"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {detail.status === "DELIVERED"
                                    ? "Đã giao"
                                    : "Đang xử lý"}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm">
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => handleEditDetail(detail)}
                                    disabled={updateDetailMutation.isPending}
                                    className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors duration-150 disabled:opacity-50 hover:cursor-pointer"
                                  >
                                    <Edit2 className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteDetail(detail)}
                                    disabled={deleteDetailMutation.isPending}
                                    className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors duration-150 disabled:opacity-50 hover:cursor-pointer"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                  <select
                                    value={detail.status}
                                    disabled={updateDetailMutation.isPending}
                                    onChange={(e) => {
                                      updateDetailMutation.mutate({
                                        service_order_id:
                                          detail.service_order_id,
                                        service_id: detail.service_id,
                                        total_price: detail.total_price,
                                        paid: detail.paid,
                                        status: e.target.value,
                                      });
                                    }}
                                    className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                                  >
                                    <option value="NOT_DELIVERED">
                                      Đang xử lý
                                    </option>
                                    <option value="DELIVERED">Đã giao</option>
                                  </select>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedOrder && (
        <div className="fixed inset-0 bg-gray-600/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
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
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 hover:cursor-pointer"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 hover:cursor-pointer"
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
        <div className="fixed inset-0 bg-gray-600/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
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
                    defaultValue=""
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    disabled={isLoadingUsers}
                  >
                    <option value="" disabled hidden>
                      --- Chọn khách hàng ---
                    </option>
                    {users?.data?.map((user) => (
                      <option key={user.user_id} value={user.user_id}>
                        {user.username}
                      </option>
                    ))}
                  </select>
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
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 hover:cursor-pointer"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={createMutation.isPending}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-600"
                  >
                    {createMutation.isPending
                      ? "Đang tạo..."
                      : "Tạo đơn dịch vụ"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && deletingOrder && (
        <div className="fixed inset-0 bg-gray-600/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Xác nhận xóa đơn dịch vụ
              </h2>
              <p className="text-gray-600 mb-6">
                Bạn có chắc chắn muốn xóa đơn dịch vụ{" "}
                <b>{deletingOrder.service_order_id}</b>? Hành động này không thể
                hoàn tác.
              </p>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeletingOrder(null);
                  }}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 hover:cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deleteMutation.isPending}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:bg-gray-400 hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-500"
                >
                  {deleteMutation.isPending ? "Đang xóa..." : "Xóa"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Detail Modal */}
      {editingDetail && (
        <div className="fixed inset-0 bg-gray-600/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Chỉnh sửa chi tiết đơn hàng
              </h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const extra_cost = parseFloat(
                    formData.get("extra_cost") as string
                  );
                  const paid = parseFloat(formData.get("paid") as string);
                  const total_price =
                    editingDetail.calculated_price + extra_cost;

                  if (paid > total_price) {
                    toast.error(
                      "Số tiền đã thanh toán không được lớn hơn tổng tiền"
                    );
                    return;
                  }

                  updateDetailMutation.mutate({
                    service_order_id: editingDetail.service_order_id,
                    service_id: editingDetail.service_id,
                    total_price,
                    extra_cost,
                    paid,
                  });
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Chi phí phát sinh
                  </label>
                  <input
                    type="number"
                    name="extra_cost"
                    defaultValue={editingDetail.extra_cost || 0}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Đã thanh toán
                  </label>
                  <input
                    type="number"
                    name="paid"
                    defaultValue={editingDetail.paid}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setEditingDetail(null)}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 hover:cursor-pointer"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={updateDetailMutation.isPending}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
                  >
                    {updateDetailMutation.isPending
                      ? "Đang cập nhật..."
                      : "Cập nhật"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Service Modal */}
      {showAddServiceModal && selectedOrder && (
        <div className="fixed inset-0 bg-gray-600/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Thêm dịch vụ
              </h2>

              <form onSubmit={handleAddService} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dịch vụ
                  </label>
                  <select
                    name="service_id"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    disabled={isLoadingServices}
                  >
                    <option value="" disabled hidden>
                      Chọn dịch vụ...
                    </option>
                    {services.map((service) => (
                      <option
                        key={service.service_id}
                        value={service.service_id}
                      >
                        {service.name} -{" "}
                        {Number(service.base_price).toLocaleString("vi-VN")}đ
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setShowAddServiceModal(false)}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 hover:cursor-pointer disabled:cursor-not-allowed "
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-500"
                    disabled={addServiceDetailMutation.isPending}
                  >
                    {addServiceDetailMutation.isPending
                      ? "Đang thêm..."
                      : "Thêm"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Detail Confirmation Modal */}
      {deletingDetail && (
        <div className="fixed inset-0 bg-gray-600/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Xác nhận xóa dịch vụ
              </h2>
              <p className="text-gray-600 mb-6">
                Bạn có chắc chắn muốn xóa dịch vụ{" "}
                <b>{deletingDetail.service?.name}</b> khỏi đơn hàng? Hành động
                này không thể hoàn tác.
              </p>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setDeletingDetail(null)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 hover:cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  onClick={confirmDeleteDetail}
                  disabled={deleteDetailMutation.isPending}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-500"
                >
                  {deleteDetailMutation.isPending ? "Đang xóa..." : "Xóa"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
