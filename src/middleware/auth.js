const jwt = require('jsonwebtoken');
const ApiError = require('../utils/apiError');
const prisma = require('../config/prisma');

const auth = (...requiredRoles) => async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new ApiError(401, 'Please authenticate'));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.sub },
      omit: { passwordHash: true },
      include: { vendor: true },
    });

    if (!user || !user.isActive) {
      return next(new ApiError(401, 'User not found or inactive'));
    }

    // Check vendor status if not super admin
    if (user.role !== 'SUPER_ADMIN' && user.vendor && user.vendor.status === 'SUSPENDED') {
      return next(new ApiError(403, 'Your business account is suspended'));
    }

    if (requiredRoles.length && !requiredRoles.includes(user.role)) {
      return next(new ApiError(403, 'Forbidden: You do not have permission to access this resource'));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ApiError(401, 'Please authenticate'));
  }
};

module.exports = auth;
