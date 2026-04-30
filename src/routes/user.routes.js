const express = require('express');
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const userValidator = require('../validators/user.validator');

const router = express.Router();

router.get('/', auth('VENDOR', 'MANAGER'), userController.getUsers);
router.post('/staff', auth('VENDOR'), validate(userValidator.createStaffSchema), userController.createStaff);
router.put('/:id', auth('VENDOR'), validate(userValidator.updateStaffSchema), userController.updateStaff);
router.patch('/:id/status', auth('VENDOR'), validate(userValidator.updateStatusSchema), userController.updateStatus);

module.exports = router;
