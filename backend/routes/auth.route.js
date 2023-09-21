const express = require('express');
const router = express.Router();

const { createUser, loginUser, forgotPassword, resetPassword } = require('../controllers/Auth.controller');
const { checkUsernameOrEmail } = require('../middlewares/verify-signup');

router.post('/signup', checkUsernameOrEmail, createUser);
router.post('/signin', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
