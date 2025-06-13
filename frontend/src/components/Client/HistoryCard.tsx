import { getAllSalesOrderDetail } from "@/api/sales_order_detail.api";
import { useQuery } from "@tanstack/react-query";
import { Fragment } from "react/jsx-runtime";

function HistoryCard({
  orderId,
  createdAt,
}: {
  orderId: string;
  createdAt: Date;
}) {
  const { data: products } = useQuery({
    queryKey: ["sales_orders", orderId],
    queryFn: () => getAllSalesOrderDetail(orderId),
  });
  const totalPrice = products?.reduce(
    (acc, { total_price }) => acc + Number(total_price),
    0
  );
  return (
    <div className="border-b-2 border-card-border pb-4">
      <h3 className="font-bold text-xl ">MÃ ĐƠN: {orderId}</h3>
      <p className="mb-6">
        {new Date(createdAt).toLocaleString("vn-VN", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>
      <div className="grid grid-cols-[200px_1fr_150px] font-semibold gap-x-4 gap-y-4">
        {products?.map(({ product, quantity, total_price }) => (
          <Fragment key={product.product_id}>
            <img src={product.image} alt="" className="max-h-[104px]" />
            <p>{product.name}</p>
            <div>
              <p className="text-md font-bold">{total_price}đ</p>
              <p>Số lượng: {quantity}</p>
            </div>
          </Fragment>
        ))}
      </div>
      <p className="mt-5 text-xl font-bold text-right">
        {totalPrice && `Tổng cộng: ${totalPrice}đ`}
      </p>
    </div>
  );
}

export default HistoryCard;
