import { useState } from "react";
import { Search, Plus, Edit2, Trash2 } from "lucide-react";
import { useLocation } from "react-router-dom";

import type {
  PurchaseOrderDetail,
  PurchaseOrderDetailUpdateData,
  PurchaseOrderDetailCreateData,
} from "@/types/PurchaseOrder/purchaseOrder.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllPurchaseOrderDetails,
  updatePurchaseOrderDetail,
  createPurchaseOrderDetail,
  deletePurchaseOrderDetail,
} from "@/api/purchaseOrderDetail.api";
import * as React from "react";

export default function PurchaseOrderDetail() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [editingPurchaseOrderDetail, setEditingPurchaseOrderDetail] =
    useState<PurchaseOrderDetail>({} as PurchaseOrderDetail);
  const [deleting, setDeleting] = useState<PurchaseOrderDetail>(
    {} as PurchaseOrderDetail,
  );

  const location = useLocation();
  console.log(location);
  const supplier_name = location.state.message;
  console.log(location.pathname.split("/")[3]);

  const { data: purchaseOrderDetailData } = useQuery({
    queryKey: ["purchaseOrderDetailData", location.pathname.split("/")[3]],
    queryFn: () => getAllPurchaseOrderDetails(location.pathname.split("/")[3]),
  });

  const haveProduct: string[] = [];
  purchaseOrderDetailData?.map((purchaseOrderDetail) => {
    haveProduct.push(purchaseOrderDetail.product.product_id);
  });
  console.log("haveProduct", haveProduct);

  const filteredPurchaseOrderDetail = purchaseOrderDetailData?.filter(
    (purchaseOrderDetail) =>
      purchaseOrderDetail.quantity
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      purchaseOrderDetail.total_price
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      purchaseOrderDetail.product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  const handleEdit = (purchaseOrderDetail: PurchaseOrderDetail) => {
    setEditingPurchaseOrderDetail(purchaseOrderDetail);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingPurchaseOrderDetail({} as unknown as PurchaseOrderDetail);
    setShowModal(true);
  };
  const handleDelete = (purchaseOrderDetail: PurchaseOrderDetail) => {
    setDeleting(purchaseOrderDetail);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Đơn nhập hàng của {supplier_name}
          </h1>
        </div>
        <button
          onClick={() => handleAdd()}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm sản phẩm nhập hàng mới
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm nhập hàng..."
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
                  Sản phẩm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số lượng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Đơn giá
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPurchaseOrderDetail?.map((purchaseOrderDetail) => (
                <tr className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {filteredPurchaseOrderDetail.indexOf(
                        purchaseOrderDetail,
                      ) + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {purchaseOrderDetail.product.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {purchaseOrderDetail.quantity}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {purchaseOrderDetail.total_price}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(purchaseOrderDetail)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors duration-150"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(purchaseOrderDetail)}
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
          haveProduct={haveProduct}
          purchase_order_id={location.pathname.split("/")[3]}
          purchaseOrderDetailData={editingPurchaseOrderDetail}
          setShowModal={setShowModal}
        />
      )}
      {deleting.purchase_order_id && (
        <ConfirmModal deleting={deleting} setDeleting={setDeleting} />
      )}
    </div>
  );
}

import { getAllProducts } from "@/api/product.api";

function PurchaseOrderModal({
  haveProduct,
  purchase_order_id,
  purchaseOrderDetailData,
  setShowModal,
}: {
  haveProduct: string[];
  purchase_order_id: string;
  purchaseOrderDetailData: PurchaseOrderDetail;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [purchaseOrderDetail, setPurchaseOrderDetail] = useState({
    purchase_order_id: purchase_order_id,
    product_id: purchaseOrderDetailData.product_id,
    quantity: purchaseOrderDetailData.quantity,
  } as PurchaseOrderDetailCreateData);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: purchaseOrderDetailData.product_id
      ? (data: PurchaseOrderDetailUpdateData) =>
          updatePurchaseOrderDetail(
            purchaseOrderDetailData.purchase_order_id,
            purchaseOrderDetailData.product_id,
            data,
          )
      : (data: PurchaseOrderDetailCreateData) =>
          createPurchaseOrderDetail(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["purchaseOrderDetailData", purchase_order_id],
      });
      setShowModal(false);
    },
  });

  console.log("haveProduct", haveProduct);

  const { data: productData } = useQuery({
    queryKey: ["productData"],
    queryFn: getAllProducts,
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(purchaseOrderDetail);
    if (
      !purchaseOrderDetail.purchase_order_id ||
      !purchaseOrderDetail.product_id
    )
      return;
    mutate(purchaseOrderDetail);
  };

  console.log(productData);

  return (
    <div className="fixed inset-0 bg-gray-600/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {purchaseOrderDetail.product_id
              ? "Chỉnh sửa đơn hàng"
              : "Thêm đơn hàng"}
          </h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên sản phẩm:
              </label>
              <select
                value={
                  purchaseOrderDetail.product_id
                    ? purchaseOrderDetail.product_id
                    : ""
                }
                disabled={purchaseOrderDetailData.product_id ? true : false}
                onChange={(e) =>
                  setPurchaseOrderDetail({
                    ...purchaseOrderDetail,
                    product_id: e.target.value,
                  })
                }
              >
                <option value=""></option>
                {productData?.map((product) =>
                  haveProduct.includes(product.product_id) ? (
                    ""
                  ) : (
                    <option value={product.product_id}>{product.name}</option>
                  ),
                )}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số lượng:
              </label>
              <input
                disabled={isPending}
                type="number"
                defaultValue={purchaseOrderDetail?.quantity || 1}
                onChange={(e) =>
                  setPurchaseOrderDetail({
                    ...purchaseOrderDetail,
                    quantity: parseInt(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter quantity"
              />
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
                ? "Đang cập nhập..."
                : purchaseOrderDetailData.product_id
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
  deleting: PurchaseOrderDetail;
  setDeleting: React.Dispatch<React.SetStateAction<PurchaseOrderDetail>>;
}) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deletePurchaseOrderDetail,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["purchaseOrderDetail"],
      });
      setDeleting({} as unknown as PurchaseOrderDetail);
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
            Bạn chắc chắn muốn xóa sản phẩm <b>{deleting.product.name}</b>?
          </h2>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <button
              onClick={() => setDeleting({} as unknown as PurchaseOrderDetail)}
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
