// src/context/NotificationContext.tsx
import { createContext, useContext, useState } from "react";

type Notification = {
  id: string;
  message: string;
  time: string;
};

type NotificationContextType = {
  notifications: Notification[];
  addNotification: (message: string) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (message: string) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      message,
      time: new Date().toLocaleString(),
    };
    setNotifications((prev) => [newNotification, ...prev]);
    console.log(newNotification, " ", notifications);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error("useNotification must be used within NotificationProvider");
  return context;
};
