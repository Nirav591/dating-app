const express = require('express');
const router = express.Router();

const { createUser, loginUser, forgotPassword, resetPassword } = require('../controllers/auth.controller');
const { checkUsernameOrEmail } = require('../middlewares/verify-signup');

router.post('/sign-up', checkUsernameOrEmail, createUser);
router.post('/sign-in', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
