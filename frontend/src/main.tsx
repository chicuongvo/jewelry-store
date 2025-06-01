import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import App from "./App.tsx";
import Home from "./pages/HomePage/Home.tsx";
import Auth from "./pages/AuthPage/Auth.tsx";
import { UserProvider } from "./contexts/userContext.tsx";
import Products from "./pages/ProductsPage/Products.tsx";

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
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>{" "}
    </UserProvider>
  </StrictMode>
);
