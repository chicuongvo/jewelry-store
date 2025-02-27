// import { neon } from "@neondatabase/serverless";
// import dotenv from "dotenv";

// dotenv.config();

// const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

// // create sql connection
// export const sql = neon(
//   `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
// );
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
