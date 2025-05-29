import productRouter from "./productRouter.js";
import supplierRouter from "./supplierRouter.js";
import productTypeRouter from "./productTypeRouter.js";
import unitRouter from "./unitRouter.js";
import authRouter from "./authRouter.js";
import serviceRouter from "./serviceRouter.js";
import inventoryReportRouter from "./inventoryReportRouter.js";

export const routes = app => {
  app.use("/api/products", productRouter);
  app.use("/api/suppliers", supplierRouter);
  app.use("/api/product-types", productTypeRouter);
  app.use("/api/units", unitRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/services", serviceRouter);
  app.use("/api/inventory-reports", inventoryReportRouter);
};
