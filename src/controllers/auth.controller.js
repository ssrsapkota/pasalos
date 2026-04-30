const asyncHandler = require('../utils/asyncHandler');
const authService = require('../services/auth.service');

const registerVendor = asyncHandler(async (req, res) => {
  const { vendor, user } = req.body;
  const result = await authService.registerVendor(vendor, user);
  const token = authService.generateToken(result.user.id);
  
  res.status(201).json({
    status: 'success',
    data: {
      user: result.user,
      vendor: result.vendor,
      token,
    },
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await authService.login(email, password);
  
  res.json({
    status: 'success',
    data: {
      user,
      token,
    },
  });
});

const getMe = asyncHandler(async (req, res) => {
  res.json({
    status: 'success',
    data: {
      user: req.user,
    },
  });
});

module.exports = {
  registerVendor,
  login,
  getMe,
};
