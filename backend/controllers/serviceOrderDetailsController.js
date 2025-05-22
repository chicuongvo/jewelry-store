import { prisma } from "../config/db.js";
import {
  deleteServiceOrderDetailsValidator,
  createServiceOrderDetailsValidator,
  updateServiceOrderDetailsValidator,
  getServiceOrderDetailsValidator,
} from "../validation/serviceOrderDetailsValidation.js";
export const getServiceOrderDetails = async (req, res) => {
  const { service_order_id, service_id } = req.params;

  try {
    await getServiceOrderDetailsValidator.validateAsync(req.params);
    const serviceOrderDetail = await prisma.service_order_details.findUnique({
      where: {
        service_id,
        service_order_id,
      },
    });
    return res.status(200).json({
      success: true,
      data: serviceOrderDetail,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.toString(),
      message: "Internal server error",
    });
  }
};
export const createServiceOrderDetails = async (req, res) => {
  // const { service_order_id, service_id, quantity, total_price } = req.body;
  const { service_order_id, service_id } = req.params;
  try {
    await createServiceOrderDetailsValidator.validateAsync({
      ...req.body,
      ...req.params,
    });
    const existingServiceOrderDetail =
      await prisma.service_order_details.findUnique({
        where: {
          service_order_id,
          service_id,
        },
      });
    if (existingServiceOrderDetail) {
      return res.status(400).json({
        success: false,
        message: "Service order detail already exists",
      });
    }
    const newServiceOrderDetail = await prisma.service_order_details.create({
      data: req.body,
    });
    return res.status(201).json({
      success: true,
      message: "Service order detail created successfully",
      data: newServiceOrderDetail,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const updateServiceOrderDetails = async (req, res) => {
  const { service_order_id, service_id } = req.params;
  try {
    await updateServiceOrderDetailsValidator.validateAsync({
      ...req.body,
      ...req.params,
    });
    const updatedServiceOrderDetail = await prisma.service_order_details.update(
      {
        where: {
          service_order_id,
          service_id,
        },
        data: req.body,
      }
    );
    return res.status(200).json({
      success: true,
      message: "Service order detail updated successfully",
      data: updatedServiceOrderDetail,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const deleteServiceOrderDetails = async (req, res) => {
  const { service_id, service_order_id } = req.params;

  try {
    await deleteServiceOrderDetailsValidator.validateAsync(req.params);
    await prisma.service_order_details.delete({
      where: {
        service_id,
        service_order_id,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.toString(),
    });
  }
};
