import { useParams } from "react-router";

// import { Download, TrendingUp, TrendingDown } from "lucide-react";
export default function InventoryReportDetails() {
  const params = useParams();
  const month = params.month;
  const year = params.year;

  console.log(month, " ", year);
  return (
    <div>Inventory Report Details for</div>
    // <div className="bg-white rounded-xl shadow-sm border border-gray-200">
    //   <div className="p-6 border-b border-gray-200">
    //     <div className="flex items-center justify-between">
    //       <div>
    //         <h2 className="text-xl font-semibold text-gray-900">
    //           {/* {selectedReport.month} Inventory Report */}
    //         </h2>
    //         <p className="text-gray-600">
    //           Detailed inventory movements and stock levels
    //         </p>
    //       </div>
    //       <div className="flex items-center space-x-3">
    //         <button className="flex items-center px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200">
    //           <Download className="h-4 w-4 mr-2" />
    //           Export PDF
    //         </button>
    //         <button
    //         //   onClick={() => setSelectedReport(null)}
    //           className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
    //         >
    //           Back to Reports
    //         </button>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="overflow-x-auto">
    //     <table className="min-w-full divide-y divide-gray-200">
    //       <thead className="bg-gray-50">
    //         <tr>
    //           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //             Product Name
    //           </th>
    //           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //             Begin Stock
    //           </th>
    //           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //             Bought
    //           </th>
    //           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //             Sold
    //           </th>
    //           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //             End Stock
    //           </th>
    //           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //             Change
    //           </th>
    //         </tr>
    //       </thead>
    //       <tbody className="bg-white divide-y divide-gray-200">
    //         {inventoryData.map((item) => {
    //           const change = item.endStock - item.beginStock;
    //           return (
    //             <tr
    //               key={item.id}
    //               className="hover:bg-gray-50 transition-colors duration-150"
    //             >
    //               <td className="px-6 py-4">
    //                 <div className="text-sm font-medium text-gray-900">
    //                   {item.productName}
    //                 </div>
    //               </td>
    //               <td className="px-6 py-4 whitespace-nowrap">
    //                 <div className="text-sm text-gray-900">
    //                   {item.beginStock} {item.unit}
    //                 </div>
    //               </td>
    //               <td className="px-6 py-4 whitespace-nowrap">
    //                 <div className="text-sm text-emerald-600 font-medium">
    //                   +{item.buyQuantity} {item.unit}
    //                 </div>
    //               </td>
    //               <td className="px-6 py-4 whitespace-nowrap">
    //                 <div className="text-sm text-red-600 font-medium">
    //                   -{item.sellQuantity} {item.unit}
    //                 </div>
    //               </td>
    //               <td className="px-6 py-4 whitespace-nowrap">
    //                 <div className="text-sm text-gray-900 font-medium">
    //                   {item.endStock} {item.unit}
    //                 </div>
    //               </td>
    //               <td className="px-6 py-4 whitespace-nowrap">
    //                 <div
    //                   className={`text-sm font-medium flex items-center ${
    //                     change > 0
    //                       ? "text-emerald-600"
    //                       : change < 0
    //                       ? "text-red-600"
    //                       : "text-gray-600"
    //                   }`}
    //                 >
    //                   {change > 0 ? (
    //                     <TrendingUp className="h-4 w-4 mr-1" />
    //                   ) : change < 0 ? (
    //                     <TrendingDown className="h-4 w-4 mr-1" />
    //                   ) : null}
    //                   {change > 0 ? "+" : ""}
    //                   {change} {item.unit}
    //                 </div>
    //               </td>
    //             </tr>
    //           );
    //         })}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
  );
}
