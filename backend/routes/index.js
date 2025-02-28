import productRouter from "./productRoutes.js";
import supplierRouter from "./supplierRoutes.js";

export const routes = (app) => {
  app.use("/api/products", productRouter);
  app.use("/api/suppliers", supplierRouter);
};
