const express = require('express');
const vendorController = require('../controllers/vendor.controller');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const vendorValidator = require('../validators/vendor.validator');

const router = express.Router();

router.get('/me', auth('VENDOR', 'MANAGER', 'CASHIER'), vendorController.getMyVendor);
router.put('/me', auth('VENDOR'), validate(vendorValidator.updateVendorSchema), vendorController.updateMyVendor);

// Super admin routes
router.get('/', auth('SUPER_ADMIN'), vendorController.getAllVendors);
router.patch('/:id/status', auth('SUPER_ADMIN'), validate(vendorValidator.updateStatusSchema), vendorController.updateStatus);

module.exports = router;
