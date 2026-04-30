const { z } = require('zod');

const createStaffSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['MANAGER', 'CASHIER']),
  }),
});

const updateStatusSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    isActive: z.boolean(),
  }),
});

const updateStaffSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    name: z.string().min(2).optional(),
    role: z.enum(['MANAGER', 'CASHIER']).optional(),
  }).refine((data) => data.name !== undefined || data.role !== undefined, {
    message: 'At least one field (name or role) must be provided',
  }),
});

module.exports = {
  createStaffSchema,
  updateStaffSchema,
  updateStatusSchema,
};
