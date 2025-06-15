import { useState } from "react";
import { Search, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import type {
  PurchaseOrder,
  PurchaseOrderCreateData,
  PurchaseOrderUpdateData,
} from "@/types/PurchaseOrder/purchaseOrder.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPurchaseOrder,
  deletePurchaseOrder,
  getAllPurchaseOrders,
  updatePurchaseOrder,
} from "@/api/purchaseOrder.api";
import * as React from "react";

export default function PurchaseOrder() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [editingPurchaseOrder, setEditingPurchaseOrder] =
    useState<PurchaseOrder>({} as PurchaseOrder);
  const [deleting, setDeleting] = useState<PurchaseOrder>({} as PurchaseOrder);

  const { data: purchaseOrderData } = useQuery({
    queryKey: ["purchaseOrder"],
    queryFn: getAllPurchaseOrders,
  });

  const haveSupplier: string[] = [];
  purchaseOrderData?.map((purchaseOrder) => {
    haveSupplier.push(purchaseOrder.supplier.supplier_id);
  });

  let navigate = useNavigate();
  const routeChange = (purchase_order_id: String, supplier_name: String) => {
    const data = { message: supplier_name, id: 0 };
    let path = `/admin/purchase-orders-detail/${purchase_order_id}`;
    navigate(path, { state: data });
  };

  const filteredPurchaseOrder = purchaseOrderData?.filter(
    (purchaseOrder) =>
      purchaseOrder.purchase_order_id
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      purchaseOrder.supplier.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      purchaseOrder.supplier.phone_number
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      purchaseOrder.created_at.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAdd = () => {
    setEditingPurchaseOrder({} as unknown as PurchaseOrder);
    setShowModal(true);
  };
  const handleDelete = (purchaseOrder: PurchaseOrder) => {
    setDeleting(purchaseOrder);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nhập hàng</h1>
          <p className="text-gray-600">Quản lý thông tin các nhà cung cấp</p>
        </div>
        <button
          onClick={() => handleAdd()}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm mới nhà cung cấp
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Tìm kiếm nhà cung cấp..."
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
                  Nhà cung cấp
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
              {filteredPurchaseOrder?.map((purchaseOrder) => (
                <tr
                  onClick={() =>
                    routeChange(
                      purchaseOrder.purchase_order_id,
                      purchaseOrder.supplier.name,
                    )
                  }
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {filteredPurchaseOrder.indexOf(purchaseOrder) + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {purchaseOrder.supplier.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {purchaseOrder.supplier.phone_number}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {purchaseOrder.created_at}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(purchaseOrder);
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
          haveSupplier={haveSupplier}
          purchaseOrderData={editingPurchaseOrder}
          setShowModal={setShowModal}
        />
      )}
      {deleting.purchase_order_id && (
        <ConfirmModal deleting={deleting} setDeleting={setDeleting} />
      )}
    </div>
  );
}

import { getAllSuppliers } from "@/api/supplier.api";

function PurchaseOrderModal({
  haveSupplier,
  purchaseOrderData,
  setShowModal,
}: {
  haveSupplier: string[];
  purchaseOrderData: PurchaseOrder;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [purchaseOrder, setPurchaseOrder] = useState({
    supplier_id: purchaseOrderData.supplier_id,
  } as PurchaseOrderCreateData);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: purchaseOrderData.purchase_order_id
      ? (data: PurchaseOrderUpdateData) =>
          updatePurchaseOrder(purchaseOrderData.purchase_order_id, data)
      : (data: PurchaseOrderCreateData) => createPurchaseOrder(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["purchaseOrder"],
      });
      setShowModal(false);
      purchaseOrderData.supplier_id
        ? toast.success("Cập nhập thành công!")
        : toast.success("Tạo mới thành công!");
    },
  });

  const { data: supplierData } = useQuery({
    queryKey: ["supplierData"],
    queryFn: getAllSuppliers,
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(purchaseOrder);
    if (!purchaseOrder.supplier_id) {
      toast.error("Vui lòng chọn nhà cung cấp.");
      return;
    }
    mutate(purchaseOrder);
  };

  return (
    <div className="fixed inset-0 bg-gray-600/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {purchaseOrder
              ? "Thêm mới đơn nhập hàng"
              : "Chỉnh sửa đơn nhập hàng"}
          </h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nhà cung cấp:
              </label>
              <select
                defaultValue={purchaseOrder ? purchaseOrder.supplier_id : ""}
                onChange={(e) =>
                  setPurchaseOrder({
                    ...purchaseOrder,
                    supplier_id: e.target.value,
                  })
                }
                className="text-wrap w-[80%]"
              >
                <option value=""></option>
                {supplierData?.map((supplier) =>
                  haveSupplier?.includes(supplier.supplier_id) ? (
                    ""
                  ) : (
                    <option value={supplier.supplier_id}>
                      {supplier.name}
                    </option>
                  ),
                )}
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
                ? "Cập nhật ..."
                : purchaseOrderData.purchase_order_id
                  ? "Cập nhật"
                  : "Tạo"}{" "}
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
  deleting: PurchaseOrder;
  setDeleting: React.Dispatch<React.SetStateAction<PurchaseOrder>>;
}) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deletePurchaseOrder,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["purchaseOrder"],
      });
      setDeleting({} as unknown as PurchaseOrder);
      toast.success("Xóa thành công!");
    },
  });

  const handleSubmit = () => {
    mutate(deleting.purchase_order_id);
  };

  return (
    <div className="fixed inset-0 bg-gray-600/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Bạn chắc chắn muốn xóa đơn nhập hàng của nhà cung cấp{" "}
            <b>{deleting.supplier.name}</b>?
          </h2>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <button
              onClick={() => setDeleting({} as unknown as PurchaseOrder)}
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
