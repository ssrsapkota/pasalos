const asyncHandler = require('../utils/asyncHandler');
const userService = require('../services/user.service');
const ApiError = require('../utils/apiError');

const getUsers = asyncHandler(async (req, res) => {
  const users = await userService.getUsers(req.user.vendorId);
  res.json({
    status: 'success',
    data: { users },
  });
});

const createStaff = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  
  if (!['MANAGER', 'CASHIER'].includes(role)) {
    throw new ApiError(400, 'Invalid role for staff user. Allowed: MANAGER, CASHIER');
  }

  const user = await userService.createStaffUser(req.user.vendorId, { name, email, password, role });
  res.status(201).json({
    status: 'success',
    data: { user },
  });
});

const updateStaff = asyncHandler(async (req, res) => {
  const user = await userService.updateStaffUser(req.params.id, req.user.vendorId, req.body);
  res.json({
    status: 'success',
    data: { user },
  });
});

const updateStatus = asyncHandler(async (req, res) => {
  const { isActive } = req.body;
  const user = await userService.updateUserStatus(req.params.id, req.user.vendorId, isActive);
  res.json({
    status: 'success',
    data: { user },
  });
});

module.exports = {
  getUsers,
  createStaff,
  updateStaff,
  updateStatus,
};
