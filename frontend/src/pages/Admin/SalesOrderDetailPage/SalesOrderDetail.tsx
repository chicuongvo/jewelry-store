import { useState } from "react";
import { Search, Plus, Edit2, Trash2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import type { SalesOrderDetailData } from "@/types/SalesOrder/salesOrder.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllSalesOrderDetail,
  createSalesOrderDetail,
  updateSalesOrderDetail,
  deleteSalesOrderDetail,
} from "@/api/sales_order_detail.api";
import * as React from "react";

export default function SalesOrderDetail() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [editingPurchaseOrderDetail, setEditingPurchaseOrderDetail] =
    useState<SalesOrderDetailData>({} as SalesOrderDetailData);
  const [deleting, setDeleting] = useState<SalesOrderDetailData>(
    {} as SalesOrderDetailData,
  );

  const location = useLocation();
  const username = location.state;

  const { data: salesOrderDetailData } = useQuery({
    queryKey: ["salesOrderDetailData", location.pathname.split("/")[3]],
    queryFn: () => getAllSalesOrderDetail(location.pathname.split("/")[3]),
  });

  const haveProduct: string[] = [];
  salesOrderDetailData?.map((salesOrder) => {
    haveProduct.push(salesOrder.product_id);
  });

  const filteredSalesOrderDetail = salesOrderDetailData?.filter(
    (salesOrderDetail) =>
      salesOrderDetail.quantity
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      salesOrderDetail.total_price
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      salesOrderDetail.product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  const handleEdit = (salesOrderDetail: SalesOrderDetailData) => {
    setEditingPurchaseOrderDetail(salesOrderDetail);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingPurchaseOrderDetail({} as unknown as SalesOrderDetailData);
    setShowModal(true);
  };
  const handleDelete = (salesOrderDetail: SalesOrderDetailData) => {
    setDeleting(salesOrderDetail);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Đơn mua hàng của {username}
          </h1>
        </div>
        <button
          onClick={() => handleAdd()}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm sản phầm
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
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
              {filteredSalesOrderDetail?.map((salesOrderDetail) => (
                <tr className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {filteredSalesOrderDetail.indexOf(salesOrderDetail) + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {salesOrderDetail.product.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {salesOrderDetail.quantity}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {salesOrderDetail.total_price}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(salesOrderDetail)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors duration-150"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(salesOrderDetail)}
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
          sales_order_id={location.pathname.split("/")[3]}
          salesOrderDetailData={editingPurchaseOrderDetail}
          setShowModal={setShowModal}
        />
      )}
      {deleting.sales_order_id && (
        <ConfirmModal deleting={deleting} setDeleting={setDeleting} />
      )}
    </div>
  );
}

import { getAllProducts } from "@/api/product.api";

function PurchaseOrderModal({
  haveProduct,
  sales_order_id,
  salesOrderDetailData,
  setShowModal,
}: {
  haveProduct: string[];
  sales_order_id: string;
  salesOrderDetailData: SalesOrderDetailData;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [salesOrderDetail, setSalesOrderDetail] = useState({
    sales_order_id: sales_order_id,
    product_id: salesOrderDetailData.product_id,
    quantity: salesOrderDetailData.quantity ? salesOrderDetailData.quantity : 1,
    total_price: 1,
  } as SalesOrderDetailData);

  const { data: productData } = useQuery({
    queryKey: ["productData"],
    queryFn: getAllProducts,
  });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: salesOrderDetailData.product_id
      ? (data: SalesOrderDetailData) => updateSalesOrderDetail(data)
      : (data: SalesOrderDetailData) => createSalesOrderDetail(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["salesOrderDetailData", sales_order_id],
      });
      setShowModal(false);
      salesOrderDetailData.product_id
        ? toast.success("Cập nhập thành công!")
        : toast.success("Tạo mới thành công!");
    },
    onError() {
      toast.error("Quá số lượng hàng tồn kho.");
    },
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (salesOrderDetail.quantity <= 0) {
      toast.error("Số lượng sản phẩm không hợp lệ.");
      return;
    }
    if (!salesOrderDetail.sales_order_id || !salesOrderDetail.product_id) {
      toast.error("Vui lòng chọn sản phẩm.");
      return;
    }
    mutate(salesOrderDetail);
  };

  return (
    <div className="fixed inset-0 bg-gray-600/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {salesOrderDetail ? "Cập nhập sản phẩm" : "Thêm mới sản phẩm"}
          </h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sản phẩm:
              </label>
              <select
                defaultValue={
                  salesOrderDetailData.product_id
                    ? salesOrderDetailData.product_id
                    : ""
                }
                disabled={salesOrderDetailData.product_id ? true : false}
                className="text-wrap w-[80%]"
                onChange={(e) =>
                  setSalesOrderDetail({
                    ...salesOrderDetail,
                    product_id: e.target.value,
                  })
                }
              >
                <option value=""></option>
                {productData?.map((product) =>
                  haveProduct.includes(product.product_id) &&
                  !salesOrderDetailData.product_id ? (
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
                defaultValue={salesOrderDetail?.quantity || 0}
                onChange={(e) =>
                  setSalesOrderDetail({
                    ...salesOrderDetail,
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
                : salesOrderDetailData.product_id
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
  deleting: SalesOrderDetailData;
  setDeleting: React.Dispatch<React.SetStateAction<SalesOrderDetailData>>;
}) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteSalesOrderDetail,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["salesOrderDetailData"],
      });
      setDeleting({} as unknown as SalesOrderDetailData);
      toast.success("Xóa thành công!");
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
              onClick={() => setDeleting({} as unknown as SalesOrderDetailData)}
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
