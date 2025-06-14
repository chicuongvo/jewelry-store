import { useState } from "react";
import { Search, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";

import type {
  SalesOrderRes,
  SalesOrderData,
} from "@/types/SalesOrder/salesOrder.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllSalesOrder,
  deleteSalesOrder,
  createSalesOrder,
} from "@/api/sales_order.api";
import * as React from "react";

export default function SalesOrder() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [editingSalesOrder, setEditingSalesOrder] = useState<SalesOrderRes>(
    {} as SalesOrderRes,
  );
  const [deleting, setDeleting] = useState<SalesOrderRes>({} as SalesOrderRes);

  const { data: salesOrderData } = useQuery({
    queryKey: ["salesOrder"],
    queryFn: getAllSalesOrder,
  });

  let navigate = useNavigate();
  const routeChange = (sales_order_id: String) => {
    let path = `/admin/sales-orders-detail/${sales_order_id}`;
    navigate(path);
  };

  console.log(salesOrderData);

  const filteredSalesOrder = salesOrderData?.filter(
    (salesOrder) =>
      salesOrder.sales_order_id
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      salesOrder.client.username
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      salesOrder.client.phone_number
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      salesOrder.created_at.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salesOrder.client_id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAdd = () => {
    setEditingSalesOrder({} as unknown as SalesOrderRes);
    setShowModal(true);
  };

  const handleDelete = (salesOrder: SalesOrderRes) => {
    setDeleting(salesOrder);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Đơn bán hàng</h1>
          <p className="text-gray-600">Quản lý các đơn bán hàng</p>
        </div>
        <button
          onClick={() => handleAdd()}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm đơn bán hàng
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Tìm kiếm đơn bán hàng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STT
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số điện thoại
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày tạo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSalesOrder?.map((salesOrder) => (
                <tr
                  onClick={() => routeChange(salesOrder.sales_order_id)}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {filteredSalesOrder.indexOf(salesOrder) + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {salesOrder.client.username}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {salesOrder.client.phone_number}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {salesOrder.created_at}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(salesOrder);
                        }}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors duration-150"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <PurchaseOrderModal
          salesOrderData={editingSalesOrder}
          setShowModal={setShowModal}
        />
      )}
      {deleting.sales_order_id && (
        <ConfirmModal deleting={deleting} setDeleting={setDeleting} />
      )}
    </div>
  );
}

import { getAllUsers } from "@/api/user.api";

function PurchaseOrderModal({
  salesOrderData,
  setShowModal,
}: {
  salesOrderData: SalesOrderRes;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [salesOder, setSalesOrder] = useState({
    client_id: salesOrderData.client_id,
  } as SalesOrderData);

  const { data: clientData } = useQuery({
    queryKey: ["clientData"],
    queryFn: getAllUsers,
  });

  console.log(clientData);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: SalesOrderData) => createSalesOrder(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["salesOrder"],
      });
      setShowModal(false);
    },
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!salesOder.client_id) return;
    mutate(salesOder);
  };

  return (
    <div className="fixed inset-0 bg-gray-600/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {salesOder ? "Chỉnh sửa đơn mua hàng" : "Thêm mới đơn mua hàng"}
          </h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên khách hàng:
              </label>
              <select
                id="client_id"
                onChange={(e) =>
                  setSalesOrder({ ...salesOder, client_id: e.target.value })
                }
              >
                {clientData?.map((client) => (
                  <option value={client.user_id}>{client.username}</option>
                ))}
              </select>
            </div>
          </form>
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Hủy
            </button>
            <button
              onClick={handleSubmit}
              disabled={isPending}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-600"
            >
              {isPending
                ? "Đang cập nhập ..."
                : salesOrderData.sales_order_id
                  ? "Cập nhập"
                  : "Tạo mới"}{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConfirmModal({
  deleting,
  setDeleting,
}: {
  deleting: SalesOrderRes;
  setDeleting: React.Dispatch<React.SetStateAction<SalesOrderRes>>;
}) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteSalesOrder,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["salesOrder"],
      });
      setDeleting({} as unknown as SalesOrderRes);
    },
  });

  const handleSubmit = () => {
    mutate(deleting);
  };

  return (
    <div className="fixed inset-0 bg-gray-600/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Bạn chắc chắn muốn xóa đơn mua hàng của{" "}
            <b>{deleting.client.username}</b>?
          </h2>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <button
              onClick={() => setDeleting({} as unknown as SalesOrderRes)}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Hủy
            </button>
            <button
              onClick={handleSubmit}
              disabled={isPending}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:bg-gray-600"
            >
              {isPending ? "Đang xóa ..." : "Xóa"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
