const express = require('express');
const authController = require('../controllers/auth.controller');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const authValidator = require('../validators/auth.validator');

const router = express.Router();

router.post('/register-vendor', validate(authValidator.registerVendorSchema), authController.registerVendor);
router.post('/login', validate(authValidator.loginSchema), authController.login);
router.get('/me', auth( 'SUPER_ADMIN', 'ADMIN', 'VENDOR', 'MANAGER', 'CASHIER'), authController.getMe);

module.exports = router;
