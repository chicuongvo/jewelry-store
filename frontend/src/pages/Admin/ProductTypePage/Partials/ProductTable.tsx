import useProducts from "@/hooks/useProducts";
import { X } from "lucide-react";

const fields = {
  name: "Tên sản phẩm",
  image: "Hình ảnh",
  description: "Mô tả",
  buy_price: "Giá mua",
  sell_price: "Giá bán",
  created_at: "Ngày tạo",
};
export default function ProducTable({
  productType,
  setModal,
}: {
  productType: string;
  setModal: () => void;
}) {
  const searchParams = new URLSearchParams();

  searchParams.set("category", productType);
  const { getFilteredProductsQuery } = useProducts(searchParams.toString());
  return (
    <div className="fixed rounded-lg w-[100vw] h-[100vh] bg-gray-900/50 z-60 top-0 left-0 flex items-center justify-center">
      <div className="w-[80vw] h-[80vh] bg-gray-50 overflow-y-auto rounded-xl py-6">
        <div className="flex justify-end-safe px-6">
          <X
            className="text-zinc-400 cursor-pointer"
            size={30}
            onClick={setModal}
          />
        </div>
        {!getFilteredProductsQuery.isLoading &&
          !getFilteredProductsQuery.error && (
            <table>
              <thead>
                <tr>
                  {Object.keys(fields).map((value, index) => {
                    return (
                      <th key={index} className="px-4 py-2">
                        {fields[value as keyof typeof fields]}
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                {getFilteredProductsQuery.data?.map((product) => (
                  <tr
                    key={product.product_id}
                    className="border-b border-gray-200 hover:bg-zinc-100 transition-all duration-300 cursor-pointer"
                  >
                    {Object.keys(fields).map((value, index) => {
                      const display = product[value as keyof typeof fields];

                      if (value === "image") {
                        return (
                          <td className="px-4 py-2" key={index}>
                            <img
                              src={String(display) || ""}
                              className="w-[200px] aspect-square object-cover"
                              alt="Ảnh sản phẩm"
                            />
                          </td>
                        );
                      }
                      if (value === "created_at") {
                        const date = new Date(display as string);
                        const formattedDate = date.toLocaleDateString("vi-VN", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        });
                        return (
                          <td key={index} className="px-4 py-2 text-center">
                            {formattedDate}
                          </td>
                        );
                      }
                      return (
                        <td
                          key={index}
                          className="px-4 py-2 text-center text-center"
                        >
                          <p className="line-clamp-2">{display}</p>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>
    </div>
  );
}
