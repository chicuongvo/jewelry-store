import { useState } from "react";
import { Search, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import type {
  SalesOrderRes,
  SalesOrderData,
} from "@/types/SalesOrder/salesOrder.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllSalesOrders,
  deleteSalesOrder,
  createSalesOrder,
} from "@/api/sales_order.api";
import { getAllUsers } from "@/api/user.api";
import type { UserProfile } from "@/types/User/User";
import { Pagination } from "antd";
import SkeletonRow from "@/components/Admin/SkeletonRow";

export default function SalesOrder() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState<SalesOrderRes>({} as SalesOrderRes);
  const limit = 6;
  const [page, setPage] = useState(1);

  const { isLoading, data: salesOrderData } = useQuery({
    queryKey: ["salesOrder", limit, page],
    queryFn: () => getAllSalesOrders({ limit: limit, page: page }),
  });

  const navigate = useNavigate();
  const routeChange = (sales_order_id: string, name: string) => {
    navigate(`/admin/sales-orders-detail/${sales_order_id}`, { state: name });
  };

  const filteredSalesOrder = salesOrderData?.data.filter((salesOrder) =>
    [
      salesOrder.sales_order_id,
      salesOrder.client?.username,
      salesOrder.client?.phone_number,
      salesOrder.created_at,
      salesOrder.client_id,
    ]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Đơn bán hàng</h1>
          <p className="text-gray-600">Quản lý các khách hàng</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex cursor-pointer items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Tạo đơn bán hàng
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Tìm kiếm khách hàng..."
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
                {[
                  "Mã đơn",
                  "Khách hàng",
                  "Số điện thoại",
                  "Ngày tạo",
                  "Hành động",
                ].map((text) => (
                  <th
                    key={text}
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {text}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <>
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                </>
              ) : (
                (filteredSalesOrder ?? []).map((salesOrder: SalesOrderRes) => (
                  <tr
                    key={salesOrder.sales_order_id}
                    onClick={() =>
                      routeChange(
                        salesOrder.sales_order_id,
                        salesOrder.client.username
                      )
                    }
                    className="hover:bg-gray-50 transition-colors duration-150 text-center cursor-pointer text-center"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {salesOrder.sales_order_id}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {salesOrder.client.username}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {salesOrder.client.phone_number}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {new Intl.DateTimeFormat("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }).format(new Date(salesOrder.created_at))}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleting(salesOrder);
                        }}
                        className="text-red-600 hover:text-red-900 p-1 cursor-pointer rounded hover:bg-red-50 transition-colors duration-150"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>{" "}
      <Pagination
        align="center"
        total={salesOrderData?.pagination.total}
        onChange={(current) => {
          setPage(current);
        }}
        current={page}
        pageSize={6}
      />
      {showModal && <PurchaseOrderModal setShowModal={setShowModal} />}
      {deleting.sales_order_id && (
        <ConfirmModal deleting={deleting} setDeleting={setDeleting} />
      )}
    </div>
  );
}

function PurchaseOrderModal({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [salesOrder, setSalesOrder] = useState<SalesOrderData>(
    {} as SalesOrderData
  );

  const { data: clientData } = useQuery({
    queryKey: ["clientData"],
    queryFn: () => getAllUsers(),
  });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createSalesOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["salesOrder"] });
      setShowModal(false);
      toast.success("Tạo đơn bán hàng thành công!");
    },
  });

  const handleSubmit = () => {
    if (!salesOrder.client_id) {
      toast.error("Vui lòng chọn khách hàng.");
      return;
    }
    mutate(salesOrder);
  };

  return (
    <div className="fixed inset-0 bg-gray-600/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Tạo đơn mua hàng
          </h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên khách hàng:
              </label>
              <select
                id="client_id"
                value={salesOrder.client_id}
                onChange={(e) =>
                  setSalesOrder({ ...salesOrder, client_id: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">-- Chọn khách hàng --</option>
                {clientData?.data.map((client: UserProfile) => (
                  <option key={client.user_id} value={client.user_id}>
                    {client.username}
                  </option>
                ))}
              </select>
            </div>
          </form>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              onClick={handleSubmit}
              disabled={isPending}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-600 cursor-pointer disabled:cursor-not-allowed"
            >
              {isPending ? "Đang xử lý..." : "Tạo mới"}
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
      queryClient.invalidateQueries({ queryKey: ["salesOrder"] });
      setDeleting({} as SalesOrderRes);
      toast.success("Xóa thành công!");
    },
  });

  const handleSubmit = () => {
    mutate(deleting);
  };

  return (
    <div className="fixed inset-0 bg-gray-600/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Bạn chắc chắn muốn xóa đơn của <b>{deleting.client.username}</b>?
          </h2>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <button
              onClick={() => setDeleting({} as SalesOrderRes)}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              onClick={handleSubmit}
              disabled={isPending}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-600"
            >
              {isPending ? "Đang xóa..." : "Xóa"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
