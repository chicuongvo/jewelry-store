import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { routes } from "./routes/index.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(helmet()); // protect app
app.use(morgan("dev")); // log the requests

routes(app);
app.listen(PORT, () => {
  console.log("Server is listening on port 5000");
});
