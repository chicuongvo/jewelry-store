/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import { useMutation } from "@tanstack/react-query";
import { Package, Users, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import type { StatsCardProps } from "../../../../components/Admin/StatsCard";
import StatsCard from "../../../../components/Admin/StatsCard";
import { getAllUsers } from "../../../../api/user.api";
import type { UserProfile } from "@/types/User/User";
import { getAllProducts } from "@/api/product.api";
import type { Product } from "@/types/Product/product";
import { getAllSalesOrder, type SalesOrderData } from "@/api/sales_order.api";

export default function StatsCards() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalSalesOrders, setTotalSalesOrders] = useState(0);

  const getUsers = useMutation({
    mutationKey: ["getAllUsers"],
    mutationFn: getAllUsers,
    onSuccess: (data: UserProfile[]) => setTotalUsers(data.length),
    onError: (error: any) => console.error("Error getting users:", error),
  });

  const getProducts = useMutation({
    mutationKey: ["getAllProducts"],
    mutationFn: getAllProducts,
    onSuccess: (data: Product[]) => setTotalProducts(data.length),
    onError: (error: any) => console.error("Error getting products:", error),
  });

  const getOrders = useMutation({
    mutationKey: ["getAllSalesOrders"],
    mutationFn: getAllSalesOrder,
    onSuccess: (data: SalesOrderData[]) => setTotalSalesOrders(data.length),
    onError: (error: any) => console.error("Error getting orders:", error),
  });

  useEffect(() => {
    getUsers.mutate();
    getProducts.mutate();
    getOrders.mutate();
  }, []);

  const statsData: StatsCardProps[] = [
    {
      title: "Tổng số sản phẩm",
      value: totalProducts.toString(),
      change: "+12%",
      changeType: "positive",
      icon: Package,
      color: "blue",
    },
    {
      title: "Tổng số người dùng",
      value: totalUsers.toString(),
      change: "+8%",
      changeType: "positive",
      icon: Users,
      color: "emerald",
    },
    {
      title: "Tổng số đơn hàng",
      value: totalSalesOrders.toString(),
      change: "-4%",
      changeType: "negative",
      icon: ShoppingCart,
      color: "amber",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statsData.map((stat, idx) => (
        <StatsCard key={idx} {...stat} />
      ))}
    </div>
  );
}
