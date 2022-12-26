const express = require('express');
const router = express.Router();
/* user controller */
const { loginUser, signupUser } = require('../controllers/userController')

/* POST: login  */
router.post('/login', loginUser)

/* POST: Sign up */
router.post('/signup', signupUser)

module.exports = router;