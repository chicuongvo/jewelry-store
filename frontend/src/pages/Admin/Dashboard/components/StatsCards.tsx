/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation } from "@tanstack/react-query";
import { Package, Users, ShoppingCart, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import type { StatsCardProps } from "../../../../components/Admin/StatsCard";
import { getAllUsers } from "../../../../api/user.api";

export default function StatsCards() {
  const [totalUsers, setTotalUsers] = useState(0);

  const mutation = useMutation({
    mutationKey: ["getAllUsers"],
    mutationFn: getAllUsers,
    onSuccess: (data) => {
      setTotalUsers(data.length);
    },
    onError: (error: unknown) => {
      console.error("Error getting all users:", error);
    },
  });

  useEffect(() => {
    mutation.mutate();
  }, []);

  const statsData: StatsCardProps[] = [
    {
      title: "Tổng số sản phẩm",
      value: "1,247",
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
      value: "932",
      change: "-4%",
      changeType: "negative",
      icon: ShoppingCart,
      color: "amber",
    },
    {
      title: "Doanh thu",
      value: "$24,389",
      change: "+5%",
      changeType: "positive",
      icon: DollarSign,
      color: "rose",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, idx) => (
        <StatsCards key={idx} {...stat} />
      ))}
    </div>
  );
}
