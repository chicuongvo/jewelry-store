/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
export interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: React.ComponentType<any>;
  color: "blue" | "emerald" | "amber" | "rose";
}

const colorClasses = {
  blue: "bg-blue-50 text-blue-600",
  emerald: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  rose: "bg-rose-50 text-rose-600",
};

export default function StatsCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  color,
}: StatsCardProps) {
  const isPositive = changeType === "positive";
  return (
    <div className="font-admin bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          <div className="flex items-center mt-2">
            {isPositive ? (
              <ArrowUpRight className="h-4 w-4 text-emerald-600" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-red-600" />
            )}
            <span
              className={`text-sm font-medium ml-1 ${
                isPositive ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {change}
            </span>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
