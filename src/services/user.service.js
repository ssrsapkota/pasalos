const bcrypt = require('bcryptjs');
const prisma = require('../config/prisma');
const ApiError = require('../utils/apiError');

const getUsers = async (vendorId) => {
  return await prisma.user.findMany({
    omit: { passwordHash: true },
    where: { vendorId },
    orderBy: { createdAt: 'desc' },
  });
};

const createStaffUser = async (vendorId, userData) => {
  const existingUser = await prisma.user.findUnique({ where: { email: userData.email } });
  if (existingUser) {
    throw new ApiError(400, 'Email already taken');
  }

  const passwordHash = await bcrypt.hash(userData.password, 10);

  return await prisma.user.create({
    omit: { passwordHash: true },
    data: {
      name: userData.name,
      email: userData.email,
      passwordHash,
      role: userData.role,
      vendorId,
    },
  });
};

const updateStaffUser = async (id, vendorId, updateData) => {
  const user = await prisma.user.findFirst({
    where: { id, vendorId },
  });

  if (!user) {
    throw new ApiError(404, 'User not found under your vendor');
  }

  return await prisma.user.update({
    omit: { passwordHash: true },
    where: { id },
    data: { name: updateData.name, role: updateData.role },
  });
};

const updateUserStatus = async (id, vendorId, isActive) => {
  const user = await prisma.user.findFirst({
    where: { id, vendorId },
  });

  if (!user) {
    throw new ApiError(404, 'User not found under your vendor');
  }

  return await prisma.user.update({
    omit: { passwordHash: true },
    where: { id },
    data: { isActive },
  });
};

module.exports = {
  getUsers,
  createStaffUser,
  updateStaffUser,
  updateUserStatus,
};
