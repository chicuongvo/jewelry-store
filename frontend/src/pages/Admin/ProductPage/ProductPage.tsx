import { useState } from "react";
import { Search, Plus, Edit2, Trash2 } from "lucide-react";
import { Modal } from "antd";
import useProducts from "@/hooks/useProducts";
import { Pagination } from "antd";
import { useSearchParams } from "react-router";
export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [modal, contextHolder] = Modal.useModal();
  const [searchParams, setSearchParams] = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams.toString());

  newSearchParams.set("limit", "6");
  const {
    getAllProductQuery,
    getAllSuppliersQuery,
    getAllProductTypesQuery,
    updateProductMutation,
    deleteProductMutation,
    createProductMutation,
    getFilteredProductsQuery,
  } = useProducts(newSearchParams.toString());

  console.log(getAllProductQuery.data);
  const filteredProducts = getFilteredProductsQuery.data?.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || product.type === selectedType;
    const matchesSupplier =
      selectedSupplier === ""
        ? true
        : product.supplier?.supplier_id === selectedSupplier;

    return matchesSearch && matchesType && matchesSupplier;
  });

  const confirmModalConfig = {
    title: "Xóa sản phẩm",
    message: "Bạn có chắc chắn muốn xóa sản phẩm này?",
  };
  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setShowModal(true);
  };
  const handleAddAndUpdateProduct = async () => {
    const formElement = document.getElementById(
      "product-form"
    ) as HTMLFormElement;
    console.log("formElement", formElement);
    const formData = new FormData(formElement);
    formData.append("unit", "VND");
    try {
      if (editingProduct) {
        await updateProductMutation.mutateAsync({
          id: editingProduct.product_id,
          data: formData,
        });
        modal.success({
          content: "Cập nhật sản phẩm thành công",
        });
      } else {
        await createProductMutation.mutateAsync(formData);
        modal.success({
          content: "Tạo sản phẩm thành công",
        });
      }
      setShowModal(false);
    } catch (error) {
      if (editingProduct) {
        modal.error({
          content: "Cập nhật sản phẩm thất bại",
        });
      } else {
        modal.error({
          content: "Tạo sản phẩm thất bại",
        });
      }
    }
  };
  const handleAdd = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  return (
    <div className="space-y-6 flex flex-col h-full w-full">
      {contextHolder}
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sản phẩm</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleAdd}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm sản phẩm
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={selectedSupplier}
            onChange={(e) => setSelectedSupplier(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Tất cả nhà cung cấp</option>
            {getAllSuppliersQuery.data?.map((supplier) => {
              return (
                <option value={supplier.supplier_id}>{supplier.name}</option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {filteredProducts?.map((product) => (
          <div
            key={product.product_id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <div className="relative">
              <img
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
                  {product.name}
                </h3>
                <div className="flex items-center space-x-2 ml-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors duration-150"
                  >
                    <Edit2 className="h-3 w-3" />
                  </button>
                  <button className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors duration-150">
                    <Trash2
                      className="h-3 w-3"
                      onClick={async () => {
                        const confirmed = await modal.confirm(
                          confirmModalConfig
                        );
                        if (confirmed) {
                          try {
                            await deleteProductMutation.mutateAsync(
                              product.product_id
                            );
                            await modal.success({
                              content: "Đã xóa sản phẩm thành công",
                            });
                          } catch (error) {
                            console.error("Error deleting product:", error);
                            await modal.error({
                              content: "Xóa sản phẩm thất bại",
                            });
                          }
                        }
                      }}
                    />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex items-center justify-between">
                  <span>Loại sản phẩm:</span>

                  <span className="text-gray-900 line-clamp-1">
                    {product.type}
                  </span>
                </div>
                <div className="flex items-center justify-between line-clamp-1">
                  <span>Nhà cung cấp: {product.supplier?.name} </span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-gray-500">Mua: </span>
                    <span className="font-medium text-gray-900">
                      ${product.buy_price}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Sell: </span>
                    <span className="font-medium text-emerald-600">
                      ${product.sell_price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-auto mb-4 h-fit w-fit">
        <Pagination
          total={getAllProductQuery.data?.length}
          onChange={(currentPage) => {
            // setPage(currentPage);
            newSearchParams.set("page", currentPage.toString());
            setSearchParams(newSearchParams);
          }}
          defaultCurrent={1}
          pageSize={6}
        />
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {editingProduct ? "Chỉnh sửa sản phẩm" : "Tạo sản phẩm"}
              </h2>

              <form className="space-y-4" id="product-form">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên sản phẩm
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={editingProduct?.name || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter product name"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Loại sản phẩm
                    </label>

                    <select
                      name="type"
                      defaultValue={editingProduct?.type || ""}
                      className="px-4 w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {getAllProductTypesQuery.data?.map((type) => (
                        <option key={type.name} value={type.name}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nhà cung cấp
                  </label>
                  <select
                    name="supplier_id"
                    defaultValue={editingProduct?.supplier_id || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {getAllSuppliersQuery.data?.map((supplier) => (
                      <option
                        key={supplier.supplier_id}
                        value={supplier.supplier_id}
                      >
                        {supplier.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Giá mua ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      name="buy_price"
                      defaultValue={editingProduct?.buy_price || 0.1}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      // placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hình ảnh
                    </label>
                    <input
                      type="file"
                      name="image"
                      accept="image/png, image/jpeg, image/jpg"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const imageSrc = URL.createObjectURL(file);
                          document
                            .querySelector("#product-image")
                            ?.setAttribute("src", imageSrc);
                        }
                      }}
                    />
                    <span className="text-xs text-gray-500">
                      Chọn hình ảnh sản phẩm (PNG, JPG, JPEG)
                    </span>
                    <img
                      src={editingProduct?.image}
                      id="product-image"
                      alt="Hình ảnh sản phẩm"
                      className="h-[200px] object-cover mt-2 rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mô tả sản phẩm
                  </label>
                  <textarea
                    name="description"
                    defaultValue={editingProduct?.description || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập mô tả sản phẩm"
                    rows={4}
                  ></textarea>
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
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  onClick={handleAddAndUpdateProduct}
                >
                  {editingProduct ? "Cập nhật" : "Tạo"} Sản phẩm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
