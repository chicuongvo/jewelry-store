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
import Login from "./pages/Admin/LoginPage/Login.tsx";
import UsersPage from "./pages/Admin/UserPage/User.tsx";
import PurchaseOrder from "@/pages/Admin/PurchaseOrderPage/PurchaseOrder.tsx";
import SalesOrder from "@/pages/Admin/SalesOrderPage/SalesOrder.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
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

            <Route path="/purchaseOrder" element={<App />}>
              <Route index element={<PurchaseOrder />} />
            </Route>

            <Route path="/salesOrder" element={<App />}>
              <Route index element={<SalesOrder />} />
            </Route>

            <Route path="/admin" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="/admin/users" element={<UsersPage />} />
            </Route>

            <Route path="/admin/login">
              <Route index element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </UserProvider>
  </StrictMode>
);
