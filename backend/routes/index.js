import productRouter from "./productRoutes.js";

export const routes = (app) => {
  app.use("/api/products", productRouter);
};
