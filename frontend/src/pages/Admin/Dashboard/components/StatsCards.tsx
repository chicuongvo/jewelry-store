/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@tanstack/react-query";
import { Package, Users, ShoppingCart } from "lucide-react";

import StatsCard from "./StatsCard";
import type { StatsCardProps } from "./StatsCard";

import { getAllUsers } from "@/api/user.api";
import { getAllProducts } from "@/api/product.api";
import { getAllSalesOrder } from "@/api/sales_order.api";
import StatsCardSkeleton from "./StatsCardSkeleton";

export default function StatsCards() {
  const { data: usersData = [], isPending: isUsersLoading } = useQuery({
    queryKey: ["getAllUsers"],
    queryFn: getAllUsers,
  });

  const { data: productsData = [], isPending: isProductsLoading } = useQuery({
    queryKey: ["getAllProducts"],
    queryFn: getAllProducts,
  });

  const { data: ordersData = [], isPending: isOrdersLoading } = useQuery({
    queryKey: ["getAllSalesOrders"],
    queryFn: getAllSalesOrder,
  });

  const isLoading = isUsersLoading || isProductsLoading || isOrdersLoading;

  const statsData: StatsCardProps[] = [
    {
      title: "Tổng số sản phẩm",
      value: productsData.length.toString(),
      change: "+12%",
      changeType: "positive",
      icon: Package,
      color: "blue",
    },
    {
      title: "Tổng số người dùng",
      value: usersData.length.toString(),
      change: "+8%",
      changeType: "positive",
      icon: Users,
      color: "emerald",
    },
    {
      title: "Tổng số đơn hàng",
      value: ordersData.length.toString(),
      change: "-4%",
      changeType: "negative",
      icon: ShoppingCart,
      color: "amber",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {isLoading
        ? Array.from({ length: 3 }).map((_, idx) => (
            <StatsCardSkeleton key={idx} />
          ))
        : statsData.map((stat, idx) => <StatsCard key={idx} {...stat} />)}
    </div>
  );
}
