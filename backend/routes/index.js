import productRouter from "./productRoutes.js";
import supplierRouter from "./supplierRoutes.js";
import productTypeRouter from "./productTypeRouter.js";
import unitRouter from "./unitRouter.js";

export const routes = (app) => {
  app.use("/api/products", productRouter);
  app.use("/api/suppliers", supplierRouter);
  app.use("/api/product-types", productTypeRouter);
  app.use("/api/units", unitRouter);
};
