const asyncHandler = require('../utils/asyncHandler');
const vendorService = require('../services/vendor.service');
const ApiError = require('../utils/apiError');

const getMyVendor = asyncHandler(async (req, res) => {
  if (!req.user.vendorId) {
    throw new ApiError(404, 'Vendor profile not found for this user');
  }
  const vendor = await vendorService.getVendorById(req.user.vendorId);
  res.json({
    status: 'success',
    data: { vendor },
  });
});

const updateMyVendor = asyncHandler(async (req, res) => {
  if (!req.user.vendorId) {
    throw new ApiError(404, 'Vendor profile not found for this user');
  }
  const vendor = await vendorService.updateVendor(req.user.vendorId, req.body);
  res.json({
    status: 'success',
    data: { vendor },
  });
});

const getAllVendors = asyncHandler(async (req, res) => {
  const vendors = await vendorService.getAllVendors();
  res.json({
    status: 'success',
    data: { vendors },
  });
});

const updateStatus = asyncHandler(async (req, res) => {
  const vendor = await vendorService.updateVendorStatus(req.params.id, req.body.status);
  res.json({
    status: 'success',
    data: { vendor },
  });
});

module.exports = {
  getMyVendor,
  updateMyVendor,
  getAllVendors,
  updateStatus,
};
