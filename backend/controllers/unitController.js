import { prisma } from "../config/db.js";
import {
  createUnitValidator,
  updateUnitValidator,
} from "../validation/unitValidation.js";

export const getAllUnits = async (req, res) => {
  try {
    const units = await prisma.units.findMany();

    return res.status(200).json({ success: true, data: units });
  } catch (error) {
    console.log("Error get all units: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getUnit = async (req, res) => {
  const { unit_id } = req.params;
  try {
    const unit = await prisma.units.findUnique({ where: { unit_id } });

    if (unit) {
      return res.status(200).json({ success: true, data: unit });
    }

    return res
      .status(404)
      .json({ success: false, message: "No unit was found" });
  } catch (error) {
    console.log("Error get unit: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const createUnit = async (req, res) => {
  const data = req.body;
  try {
    if (!data || Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No data provided" });
    }

    await createUnitValidator.validateAsync(data);

    const newUnit = await prisma.units.create({ data });

    return res.status(200).json({ success: true, data: newUnit });
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({
        success: false,
        message: error.details.map((err) => err.message),
      });
    }

    console.log("Error creating unit:", error);

    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

export const deleteUnit = async (req, res) => {
  const { unit_id } = req.params;
  try {
    const checkUnit = await prisma.units.findUnique({
      where: { unit_id },
    });

    if (!checkUnit) {
      return res
        .status(404)
        .json({ success: false, message: "Unit not found" });
    }

    await prisma.units.delete({ where: { unit_id } });

    return res
      .status(200)
      .json({ success: true, message: "Delete unit successfully" });
  } catch (error) {
    console.log("Error delete unit:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const updateUnit = async (req, res) => {
  const { unit_id } = req.params;
  const data = req.body;

  try {
    if (!data || Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No updated data provided" });
    }

    await updateUnitValidator.validateAsync(data);

    const checkUnit = await prisma.units.findUnique({
      where: { unit_id },
    });

    if (!checkUnit) {
      return res
        .status(404)
        .json({ success: false, message: "Unit not found" });
    }

    const updatedSupplier = await prisma.units.updateManyAndReturn({
      where: { unit_id },
      data: data,
    });

    return res.status(200).json({ success: true, data: updatedSupplier });
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({
        success: false,
        message: error.details.map((err) => err.message),
      });
    } else {
      console.log("Error update unit:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
};
