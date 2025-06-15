import React, { useState } from "react";
import { Search, Plus, Edit2, Trash2, Wrench, X } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/contexts/notificationContext";
import { Pagination } from "antd";
import type {
  ServiceResponse,
  ServiceCreate,
  ServiceUpdate,
} from "../../../types/service/service";
import {
  getAllServices,
  createService,
  updateService,
  deleteService,
} from "../../../api/service.api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminServices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // 6 items per page for grid layout
  const [selectedService, setSelectedService] =
    useState<ServiceResponse | null>(null);
  const [deleting, setDeleting] = useState<ServiceResponse>(
    {} as unknown as ServiceResponse
  );
  const [editingService, setEditingService] = useState<ServiceResponse | null>(
    null
  );
  const queryClient = useQueryClient();
  const { addNotification } = useNotification();

  const { data: services = [], isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: getAllServices,
  });

  const createMutation = useMutation({
    mutationFn: (data: ServiceCreate) => createService(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Tạo dịch vụ thành công");
      addNotification(
        `Dịch vụ mới ${response.name} (ID: ${
          response.service_id
        }) đã được tạo với giá ${Number(response.base_price).toLocaleString(
          "vi-VN"
        )}đ.`
      );
      setShowModal(false);
    },
    onError: (error) => {
      toast.error("Không thể tạo dịch vụ");
      console.error("Lỗi tạo dịch vụ:", error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ServiceUpdate }) =>
      updateService(id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Cập nhật dịch vụ thành công");
      addNotification(
        `Dịch vụ ${response.name} (ID: ${
          response.service_id
        }) đã được cập nhật. Giá mới: ${Number(
          response.base_price
        ).toLocaleString("vi-VN")}đ.`
      );
      setShowModal(false);
    },
    onError: (error) => {
      toast.error("Không thể cập nhật dịch vụ");
      console.error("Lỗi cập nhật dịch vụ:", error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Xóa dịch vụ thành công");
      setDeleting({} as unknown as ServiceResponse);
    },
    onError: (error) => {
      toast.error("Không thể xóa dịch vụ");
      console.error("Lỗi xóa dịch vụ:", error);
    },
  });

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (service: ServiceResponse) => {
    setEditingService(service);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingService(null);
    setShowModal(true);
  };

  const handleDelete = (service: ServiceResponse) => {
    setDeleting(service);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      base_price: parseFloat(formData.get("base_price") as string),
    };

    if (editingService) {
      updateMutation.mutate({ id: editingService.service_id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleViewOrders = (service: ServiceResponse) => {
    setSelectedService(service);
    setShowOrdersModal(true);
  };

  if (isLoading) {
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

        {/* Search Skeleton */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="h-10 w-96 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Services Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                  <div className="ml-3">
                    <div className="h-5 w-32 bg-gray-200 rounded"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded mt-2"></div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-gray-200 rounded"></div>
                  <div className="h-8 w-8 bg-gray-200 rounded"></div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                </div>
                <div className="pt-3 border-t border-gray-100">
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
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
          <h1 className="text-2xl font-bold text-gray-900">Dịch Vụ</h1>
          <p className="text-gray-600">Quản lý dịch vụ và giá cả</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex-shrink-0 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 hover:cursor-pointer"
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm dịch vụ
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Tìm kiếm dịch vụ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices
          .slice((currentPage - 1) * pageSize, currentPage * pageSize)
          .map((service) => (
            <div
              key={service.service_id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Wrench className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {service.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {service.service_order_details?.length || 0} đơn hàng
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(service)}
                    disabled={updateMutation.isPending}
                    className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors duration-150 disabled:opacity-50 hover:cursor-pointer"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(service)}
                    disabled={deleteMutation.isPending}
                    className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors duration-150 disabled:opacity-50 hover:cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Giá cơ bản</span>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-emerald-600">
                      {Number(service.base_price).toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Số đơn hàng</span>
                  <span className="text-sm font-medium text-gray-900">
                    {service.service_order_details?.length || 0}
                  </span>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleViewOrders(service)}
                    className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium hover:cursor-pointer"
                  >
                    Xem đơn hàng →
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Thêm phân trang */}
      <div className="mt-6 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredServices.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600/50  z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {editingService ? "Chỉnh sửa dịch vụ" : "Thêm dịch vụ"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên dịch vụ
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={editingService?.name || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập tên dịch vụ"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Giá cơ bản (VNĐ)
                  </label>
                  <input
                    type="number"
                    name="base_price"
                    min="0"
                    defaultValue={editingService?.base_price || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                    required
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-blue-700">
                    <p className="font-medium">Lưu ý:</p>
                    <p>
                      Giá cơ bản có thể được điều chỉnh với chi phí phát sinh
                      khi tạo đơn dịch vụ.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    disabled={
                      createMutation.isPending || updateMutation.isPending
                    }
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 hover:cursor-pointer"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={
                      createMutation.isPending || updateMutation.isPending
                    }
                    className="px-4 py-2 bg-blue-600 disabled:cursor-not-allowed text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 hover:cursor-pointer"
                  >
                    {createMutation.isPending || updateMutation.isPending
                      ? "Đang xử lý..."
                      : editingService
                      ? "Cập nhật"
                      : "Tạo dịch vụ"}{" "}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {deleting.service_id && (
        <ConfirmModal deleting={deleting} setDeleting={setDeleting} />
      )}

      {/* Orders Modal */}
      {showOrdersModal && selectedService && (
        <div className="fixed inset-0 bg-gray-600/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Đơn hàng của dịch vụ: {selectedService.name}
                </h2>
                <button
                  onClick={() => setShowOrdersModal(false)}
                  className="text-gray-400 hover:text-gray-500 disabled:opacity-50 hover:cursor-pointer"
                  disabled={
                    createMutation.isPending || updateMutation.isPending
                  }
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                {selectedService.service_order_details &&
                selectedService.service_order_details.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Mã đơn hàng
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tên khách hàng
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ngày tạo
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Trạng thái
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tổng tiền
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedService.service_order_details.map((order) => (
                          <tr
                            key={order.service_order_id}
                            className="hover:bg-gray-50"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              #{order.service_order.service_order_id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {order.service_order.client.username}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(
                                order.service_order.created_at
                              ).toLocaleDateString("vi-VN")}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  order.service_order.status === "completed"
                                    ? "bg-green-100 text-green-800"
                                    : order.service_order.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {order.service_order.status === "DELIVERED"
                                  ? "Hoàn thành"
                                  : order.service_order.status === "pending"
                                  ? "Đang xử lý"
                                  : "Chờ xử lý"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {Number(order.total_price).toLocaleString(
                                "vi-VN"
                              )}
                              đ
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      Chưa có đơn hàng nào cho dịch vụ này
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ConfirmModal({
  deleting,
  setDeleting,
}: {
  deleting: ServiceResponse;
  setDeleting: React.Dispatch<React.SetStateAction<ServiceResponse>>;
}) {
  const queryClient = useQueryClient();
  const { addNotification } = useNotification();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteService,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["services"],
      });
      setDeleting({} as unknown as ServiceResponse);
      toast.success("Xóa dịch vụ thành công");
      addNotification(
        `Dịch vụ ${deleting.name} (ID: ${
          deleting.service_id
        }) đã được xóa. Giá cũ: ${Number(deleting.base_price).toLocaleString(
          "vi-VN"
        )}đ.`
      );
    },

    onError: (error) => {
      toast.error("Không thể xóa dịch vụ");
      console.error("Lỗi xóa dịch vụ:", error);
    },
  });

  const handleSubmit = () => {
    mutate(deleting.service_id);
  };

  return (
    <div className="fixed inset-0 bg-gray-600/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Bạn chắc chắn muốn xóa dịch vụ <b>{deleting.name}</b>?
          </h2>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <button
              onClick={() => setDeleting({} as unknown as ServiceResponse)}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 hover:cursor-pointer"
            >
              Hủy
            </button>
            <button
              onClick={handleSubmit}
              disabled={isPending}
              className="px-4 py-2 disabled:cursor-not-allowed bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 hover:cursor-pointer"
            >
              {isPending ? "Đang xóa..." : "Xóa"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
