import { useNotification } from "@/contexts/notificationContext";
import { useState, useEffect } from "react";
import ChartSkeleton from "./ChartSkeleton";

export default function RecentActivity() {
  const { notifications } = useNotification();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Thông báo</h2>
      {loading ? (
        <ChartSkeleton />
      ) : notifications.length === 0 ? (
        <p className="text-sm text-gray-500">Gần đây không có thông báo nào.</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {notification.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
        Xem tất cả thông báo
      </button>
    </div>
  );
}
