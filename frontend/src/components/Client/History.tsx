import { useUser } from "@/contexts/userContext";
import { HistoryIcon } from "lucide-react";
import HistoryCard from "./HistoryCard";

function History() {
  const { userProfile } = useUser();

  const saleOrders = userProfile?.sales_orders;
  if (!saleOrders?.length) return <p>Không có đơn hàng nào</p>;
  return (
    <div className="py-6 border border-card-border max-w-[1000px] mx-auto h-dvh">
      <div className="flex justify-center items-center gap-1">
        <HistoryIcon className="inline" />
        <h2 className="uppercase text-2xl font-bold text-center">
          Lịch sử mua hàng
        </h2>
      </div>
      <ul className="px-10 mt-6">
        {saleOrders?.map(order => (
          <li key={order.sales_order_id}>
            <HistoryCard
              createdAt={order.created_at}
              orderId={order.sales_order_id}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
