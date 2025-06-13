import React, { useState } from "react";
import { Search, Plus, Edit2, Trash2, Wrench } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/contexts/notificationContext";
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
import { toast } from "react-hot-toast";

export default function AdminServices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState<ServiceResponse>(
    {} as unknown as ServiceResponse
  );
  const [editingService, setEditingService] = useState<ServiceResponse | null>(
    null
  );
  const queryClient = useQueryClient();

  const { data: services = [], isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: getAllServices,
  });

  const createMutation = useMutation({
    mutationFn: (data: ServiceCreate) => createService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Tạo dịch vụ thành công");
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Cập nhật dịch vụ thành công");
      setShowModal(false);
    },
    onError: (error) => {
      toast.error("Không thể cập nhật dịch vụ");
      console.error("Lỗi cập nhật dịch vụ:", error);
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

  if (isLoading) {
    return <div>Đang tải...</div>;
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
          className="flex-shrink-0 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm Dịch Vụ
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
        {filteredServices.map((service) => (
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
                  className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors duration-150"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(service)}
                  className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors duration-150"
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
                <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Xem đơn hàng →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600/50  z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {editingService ? "Chỉnh Sửa Dịch Vụ" : "Thêm Dịch Vụ Mới"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên Dịch Vụ
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
                    Giá Cơ Bản (VNĐ)
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
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    {editingService ? "Cập Nhật" : "Tạo"} Dịch Vụ
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
    /**
     * After successfully deleting the service, invalidate the "services" query, reset `deleting` to an empty object, and
     * show a notification to the user that the service has been deleted.
     */
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["services"],
      });
      setDeleting({} as unknown as ServiceResponse);
      addNotification(`Dịch vụ ${deleting.name} vừa được xóa.`);
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
            Bạn chắc chắn muốn xóa Nhà cung cấp <b>{deleting.name}</b>?
          </h2>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <button
              onClick={() => setDeleting({} as unknown as ServiceResponse)}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Hủy
            </button>
            <button
              onClick={handleSubmit}
              disabled={isPending}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:bg-gray-600"
            >
              {isPending ? "Đang xóa..." : "Xóa"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
