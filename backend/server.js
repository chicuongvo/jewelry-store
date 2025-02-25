import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { routes } from "./routes/index.js";
import { sql } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

console.log(PORT);

app.use(express.json());
app.use(cors());
app.use(helmet()); // protect app
app.use(morgan("dev")); // log the requests

routes(app);

async function initDB() {
  try {
    await sql`
    CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL, 
    type VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL, 
    unit VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    price MONEY NOT NULL,
    opening_stock INTEGER NOT NULL,
    stock_in INTEGER NOT NULL,
    stock_out INTEGER NOT NULL,
    closing_stock INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;

    console.log("Database initialized successfully");
  } catch (error) {
    console.log("Error initDb", error);
  }
}
initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is listening on port 5000");
  });
});
