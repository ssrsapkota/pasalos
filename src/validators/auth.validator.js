const { z } = require('zod');

const registerVendorSchema = z.object({
  body: z.object({
    vendor: z.object({
      businessName: z.string().min(2),
      ownerName: z.string().min(2),
      phone: z.string().optional(),
      email: z.string().email().optional(),
      address: z.string().optional(),
      businessType: z.string().optional(),
    }),
    user: z.object({
      name: z.string().min(2),
      email: z.string().email(),
      password: z.string().min(6),
    }),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

module.exports = {
  registerVendorSchema,
  loginSchema,
};
