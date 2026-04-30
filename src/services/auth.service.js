const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');
const ApiError = require('../utils/apiError');

const generateToken = (userId) => {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const registerVendor = async (vendorData, userData) => {
  const existingUser = await prisma.user.findUnique({ where: { email: userData.email } });
  if (existingUser) {
    throw new ApiError(400, 'Email already taken');
  }

  const passwordHash = await bcrypt.hash(userData.password, 10);

  return await prisma.$transaction(async (tx) => {
    const vendor = await tx.vendor.create({
      data: {
        businessName: vendorData.businessName,
        ownerName: vendorData.ownerName,
        phone: vendorData.phone,
        email: vendorData.email,
        address: vendorData.address,
        businessType: vendorData.businessType,
      },
    });

    const user = await tx.user.create({
      omit: { passwordHash: true },
      data: {
        name: userData.name,
        email: userData.email,
        passwordHash,
        role: 'VENDOR',
        vendorId: vendor.id,
      },
    });

    return { vendor, user };
  });
};

const login = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { vendor: true },
  });

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    throw new ApiError(401, 'Incorrect email or password');
  }

  if (!user.isActive) {
    throw new ApiError(401, 'User account is inactive');
  }

  const token = generateToken(user.id);
  const { passwordHash, ...safeUser } = user;
  return { user: safeUser, token };
};

module.exports = {
  registerVendor,
  login,
  generateToken,
};
