const prisma = require('../config/prisma');
const ApiError = require('../utils/apiError');

const getVendorById = async (id) => {
  return await prisma.vendor.findUnique({
    where: { id },
  });
};

const updateVendor = async (id, updateBody) => {
  const vendor = await getVendorById(id);
  if (!vendor) {
    throw new ApiError(404, 'Vendor not found');
  }
  const { businessName, ownerName, phone, email, address, businessType } = updateBody;
  return await prisma.vendor.update({
    where: { id },
    data: { businessName, ownerName, phone, email, address, businessType },
  });
};

const getAllVendors = async () => {
  return await prisma.vendor.findMany({
    orderBy: { createdAt: 'desc' },
  });
};

const updateVendorStatus = async (id, status) => {
  const vendor = await getVendorById(id);
  if (!vendor) {
    throw new ApiError(404, 'Vendor not found');
  }
  return await prisma.vendor.update({
    where: { id },
    data: { status },
  });
};

module.exports = {
  getVendorById,
  updateVendor,
  getAllVendors,
  updateVendorStatus,
};
