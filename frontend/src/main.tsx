import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import App from "./App.tsx";
import Home from "./pages/Client/HomePage/Home.tsx";
import Auth from "./pages/Client/AuthPage/Auth.tsx";
import { UserProvider } from "./contexts/userContext.tsx";
import Products from "./pages/Client/ProductsPage/Products.tsx";
import ProductDetailsPage from "./pages/Client/ProductDetailsPage/ProductDetails.tsx";
import Layout from "./components/Admin/Layout.tsx";
import Dashboard from "./pages/Admin/Dashboard/Dashboard.tsx";
import UsersPage from "./pages/Admin/UserPage/User.tsx";
import PurchaseOrder from "@/pages/Admin/PurchaseOrderPage/PurchaseOrder.tsx";
import SalesOrder from "@/pages/Admin/SalesOrderPage/SalesOrder.tsx";
import SalesOrderDetail from "@/pages/Admin/SalesOrderDetailPage/SalesOrderDetail.tsx";
import Supplier from "./pages/Admin/SupplierPage/Supplier.tsx";
import AdminServices from "./pages/Admin/ServicePage/Service.tsx";
import AdminServiceOrders from "./pages/Admin/ServiceOrderPage/ServiceOrder.tsx";
import AdminProducts from "./pages/Admin/ProductPage/ProductPage";
import ProductType from "./pages/Admin/ProductTypePage/ProductType";
import { NotificationProvider } from "./contexts/notificationContext.tsx";
import InventoryReports from "./pages/Admin/InventoryReportPage/InventoryReport.tsx";
import InventoryReportDetails from "./pages/Admin/InventoryReportDetailsPage/InventoryReportDetails.tsx";
import Services from "./pages/Client/ServicesPage/Services.tsx";
import History from "./components/Client/History.tsx";
import Profile from "./pages/Client/Profile/Profile.tsx";
import ServiceHistory from "./components/Client/ServiceHistory.tsx";
import { CartProvider } from "./contexts/cartContext.tsx";
import Cart from "./pages/Client/CartPage/Cart.tsx";
import PurchaseOrderDetail from "./pages/Admin/PurchaseOrderDetailPage/PurchaseOrderDetail.tsx";
import ProtectedRoute from "./components/ProtectedRoutes.tsx";
import UnauthorizedPage from "./pages/UnauthorizedPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <NotificationProvider>
        <CartProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<App />}>
                  <Route index element={<Home />} />
                  <Route path="/history" element={<History />} />
                  <Route
                    path="/service-history"
                    element={
                      <ProtectedRoute>
                        <ServiceHistory />{" "}
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                </Route>

                <Route path="/auth" element={<App />}>
                  <Route index element={<Auth />} />
                </Route>

                <Route path="/products" element={<App />}>
                  <Route index element={<Products />} />
                </Route>

                <Route path="/product/:id" element={<App />}>
                  <Route index element={<ProductDetailsPage />} />
                </Route>

                <Route path="/services" element={<App />}>
                  <Route index element={<Services />} />
                </Route>

                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <App />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Cart />} />
                </Route>

                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute requiredRole="ADMIN">
                      <Layout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="/admin/users" element={<UsersPage />} />
                  <Route path="/admin/suppliers" element={<Supplier />} />
                  <Route
                    path="/admin/inventory-reports"
                    element={<InventoryReports />}
                  />
                  <Route
                    path="/admin/inventory-reports/:month/:year"
                    element={<InventoryReportDetails />}
                  />
                  <Route path="/admin/products" element={<AdminProducts />} />
                  <Route
                    path="/admin/product-types"
                    element={<ProductType />}
                  />
                  <Route
                    path="/admin/purchase-orders"
                    element={<PurchaseOrder />}
                  />
                  <Route
                    path="/admin/purchase-orders-detail/:purchase_order_id"
                    element={<PurchaseOrderDetail />}
                  />
                  <Route path="/admin/sales-orders" element={<SalesOrder />} />{" "}
                  <Route
                    path="/admin/sales-orders-detail/:sales_order_id"
                    element={<SalesOrderDetail />}
                  />
                  <Route path="/admin/services" element={<AdminServices />} />
                  <Route
                    path="/admin/service-orders"
                    element={<AdminServiceOrders />}
                  />
                </Route>
                <Route path="/unauthorized" element={<UnauthorizedPage />} />

                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </BrowserRouter>
          </QueryClientProvider>
        </CartProvider>
      </NotificationProvider>
    </UserProvider>
  </StrictMode>
);
