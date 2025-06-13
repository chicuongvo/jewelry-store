import {useState} from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2
} from "lucide-react";


import type {SalesOrderRes, SalesOrderData} from "@/types/SalesOrder/salesOrder.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
  getAllSalesOrder,
  deleteSalesOrder, createSalesOrder,
} from "@/api/sales_order.api";
import * as React from "react";

export default function SalesOrder() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [editingSalesOrder, setEditingSalesOrder] = useState<SalesOrderRes>(
    {} as SalesOrderRes
  );
  const [deleting, setDeleting] = useState<SalesOrderRes>(
    {} as SalesOrderRes
  );

  const {data: salesOrderData} = useQuery({
    queryKey: ["salesOrder"],
    queryFn: getAllSalesOrder,
  });

  console.log(salesOrderData);

  const filteredSalesOrder = salesOrderData?.filter(
    salesOrder =>
      salesOrder.sales_order_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salesOrder.client_id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleEdit = (salesOrder: SalesOrderRes) => {
    setEditingSalesOrder(salesOrder);
    setShowModal(true);
  }

  const handleAdd = () => {
    setEditingSalesOrder({} as unknown as SalesOrderRes);
    setShowModal(true);
  }

  const handleDelete = (salesOrder: SalesOrderRes) => {
    setDeleting(salesOrder);
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Order</h1>
          <p className="text-gray-600">
            Manage your sales order information and relationships
          </p>
        </div>
        <button
          onClick={() => handleAdd()}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2"/>
          Add Sales Order
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"/>
            <input
              type="text"
              placeholder="Search sales order..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
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
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {filteredSalesOrder?.map((salesOrder) => (
              <tr
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {filteredSalesOrder.indexOf(salesOrder) + 1}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {salesOrder.sales_order_id}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {salesOrder.client_id}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => (handleEdit(salesOrder))}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors duration-150"
                    >
                      <Edit2 className="h-4 w-4"/>
                    </button>
                    <button
                      onClick={() => (handleDelete(salesOrder))}
                      className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors duration-150"
                    >
                      <Trash2 className="h-4 w-4"/>
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

function PurchaseOrderModal({
                              salesOrderData,
                              setShowModal,
                            }: {
  salesOrderData: SalesOrderRes;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [salesOder, setSalesOrder] = useState({
    client_id: salesOrderData.client_id
  } as SalesOrderData);

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
            {salesOder ? "Edit Sales Order" : "Add New Sales Order"}
          </h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client ID:
              </label>
              <input
                disabled={isPending}
                type="text"
                defaultValue={salesOder?.client_id|| ""}
                onChange={e =>
                  setSalesOrder({ ...setSalesOrder, client_id: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter supplier name"
              />
            </div>
          </form>
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isPending}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-600"
            >
              {isPending
                ? "Updating ..."
                : salesOrderData.sales_order_id
                  ? "Update"
                  : "Create"}{" "}
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
  const {mutate, isPending} = useMutation({
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
            Bạn chắc chắn muốn xóa Đơn bán hàng <b>{deleting.sales_order_id}</b>?
          </h2>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <button
              onClick={() => setDeleting({} as unknown as SalesOrderRes)}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isPending}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:bg-gray-600"
            >
              {isPending ? "Deleting ..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
