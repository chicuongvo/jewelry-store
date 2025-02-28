import { prisma } from "../config/db.js";

export const getAllTypes = async (req, res) => {
  try {
    const types = await prisma.product_types.findMany();

    return res.status(200).json({ success: true, data: types });
  } catch (error) {
    console.log("Error get all types", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
