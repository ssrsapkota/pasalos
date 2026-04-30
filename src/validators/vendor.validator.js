const { z } = require('zod');

const updateVendorSchema = z.object({
  body: z.object({
    businessName: z.string().min(2).optional(),
    ownerName: z.string().min(2).optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    address: z.string().optional(),
    businessType: z.string().optional(),
  }),
});

const updateStatusSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    status: z.enum(['PENDING_VERIFICATION', 'ACTIVE', 'SUSPENDED']),
  }),
});

module.exports = {
  updateVendorSchema,
  updateStatusSchema,
};
