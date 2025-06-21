/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Tag,
  Percent,
  Download,
} from "lucide-react";

import { Modal } from "antd";

import useProductTypes from "@/hooks/useProductTypes";
import { Pagination } from "antd";
import { useSearchParams } from "react-router";
import InventoryReportSkeleton from "../InventoryReportPage/components/Skeleton";
import ProducTable from "./Partials/ProductTable";
import { exportToExcel } from "@/utility/exportToExcel";
const limit = 6;
export default function ProductTypes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [productModal, setProductModal] = useState(false);
  const [productType, setProductType] = useState<string>("Vòng cổ");
  const [editingType, setEditingType] = useState<any>(null);
  const [modal, contextHolder] = Modal.useModal();

  const [searchParams, setSearchParams] = useSearchParams();
  const newSeachParams = new URLSearchParams(searchParams.toString());
  newSeachParams.set("limit", limit.toString());

  const {
    getAllProductTypesQuery,
    getFilteredProductTypesQuery,
    createProductTypeMutation,
    updateProductTypeMutation,
    deleteProductTypeMutation,
  } = useProductTypes(newSeachParams.toString());

  console.log(getAllProductTypesQuery.data?.length);
  console.log(getFilteredProductTypesQuery.data?.length);
  const filteredTypes = getFilteredProductTypesQuery.data?.filter((type) =>
    type.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (type: any) => {
    setEditingType(type);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingType(null);
    setShowModal(true);
  };
  const handleAddAndUpdateProductType = async () => {
    const formElement = document.getElementById("productTypeForm");
    const formData = new FormData(formElement as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    const profitRate = parseFloat(data.profit_rate as string);

    const formmattedData = {
      ...data,
      profit_rate: profitRate,
    };
    if (isNaN(profitRate) || profitRate < 0 || profitRate > 0.5) {
      modal.error({
        title: "Tỉ lệ lợi nhuận không hợp lệ",
        content: "Vui lòng nhập tỉ lệ lợi nhuận hợp lệ từ 0 đến 0.5.",
      });
      return;
    }

    try {
      if (editingType) {
        await updateProductTypeMutation.mutateAsync({
          id: editingType.type_id,
          data: formmattedData,
        });
        modal.success({
          title: "Cập nhật loại sản phẩm thành công",
          content: "Loại sản phẩm đã được cập nhật thành công.",
        });
      } else {
        await createProductTypeMutation.mutateAsync(formmattedData);
        modal.success({
          title: "Tạo loại sản phẩm thành công",
          content: "Loại sản phẩm đã được tạo thành công.",
        });
      }
      setShowModal(false);
    } catch (error) {
      console.log("Error creating/updating product type:", error);
      if (editingType) {
        modal.error({
          title: "Cập nhật loại sản phẩm thất bại",
          content: "Đã xảy ra lỗi khi cập nhật loại sản phẩm.",
        });
      } else {
        modal.error({
          title: "Tạo loại sản phẩm thất bại",
          content: "Đã xảy ra lỗi khi tạo loại sản phẩm.",
        });
      }
    }
  };
  return (
    <div className="space-y-6 flex flex-col w-full h-full">
      {contextHolder}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Loại sản phẩm</h1>
          <p className="text-gray-600">
            Quản lí các loại sản phẩm của bạn, bao gồm thông tin chi tiết và tỉ
            lệ lợi nhuận.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleAdd}
            className="flex cursor-pointer items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm loại sản phẩm
          </button>
          <button
            onClick={() =>
              exportToExcel(filteredTypes ?? [], ` Danh sách loại sản phẩm `)
            }
            className="flex cursor-pointer items-center px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200"
          >
            <Download className="h-4 w-4 mr-2" />
            Xuất dữ liệu
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Tìm kiếm loại sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {getAllProductTypesQuery.isLoading ||
      getFilteredProductTypesQuery.isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {Array.from({ length: limit }).map((_, index) => {
            return <InventoryReportSkeleton index={index} />;
          })}
        </div>
      ) : (
        <div className="loader"></div>
      )}
      {/* Product Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTypes?.map((type) => (
          <div
            key={type.type_id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Tag className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {type.name}
                  </h3>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEdit(type)}
                  className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors duration-150 cursor-pointer"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors duration-150 cursor-pointer"
                  onClick={async () => {
                    const confirmed = await modal.confirm({
                      title: "Xóa loại sản phẩm",
                      content: `Bạn có chắc chắn muốn xóa loại sản phẩm "${type.name}"?`,
                    });
                    if (confirmed) {
                      await deleteProductTypeMutation.mutateAsync(type.type_id);
                      modal.success({
                        title: "Xóa loại sản phẩm thành công",
                        content: `Loại sản phẩm "${type.name}" đã được xóa.`,
                      });
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tỉ lệ lợi nhuận</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-emerald-600">
                    {type.profit_rate}
                  </span>
                  <Percent className="h-4 w-4 text-emerald-600 mr-1" />
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <button
                  className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium"
                  onClick={() => {
                    setProductModal(true);
                    console.log(type.name);
                    setProductType(type.name);
                  }}
                >
                  Xem các sản phẩm →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-auto w-fit- h-fit mb-4">
        <Pagination
          onChange={(currentPage) => {
            newSeachParams.set("page", currentPage.toString());
            setSearchParams(newSeachParams);
          }}
          pageSize={6}
          total={getAllProductTypesQuery.data?.length || 0}
        />
      </div>
      {/* Modal */}
      {productModal && (
        <ProducTable
          productType={productType}
          setModal={() => {
            setProductModal(false);
          }}
        />
      )}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {editingType ? "Chỉnh sửa loại sản phẩm" : "Thêm loại sản phẩm"}
              </h2>

              <form className="space-y-4" id="productTypeForm">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên loại sản phẩm
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    maxLength={50}
                    minLength={3}
                    defaultValue={editingType?.name || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập tên loại sản phẩm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tỉ lệ lợi nhuận (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    name="profit_rate"
                    defaultValue={editingType?.profit_rate || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập tỉ lệ lợi nhuận"
                  />
                </div>
              </form>

              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                >
                  Hủy
                </button>
                {updateProductTypeMutation.isPending ||
                createProductTypeMutation.isPending ? (
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg opacity-50 cursor-not-allowed"
                    disabled
                  >
                    {editingType ? "Đang cập nhật..." : "Đang tạo..."}
                  </button>
                ) : (
                  <button
                    className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    onClick={handleAddAndUpdateProductType}
                  >
                    {editingType ? "Cập nhật" : "Tạo"} loại sản phẩm
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
