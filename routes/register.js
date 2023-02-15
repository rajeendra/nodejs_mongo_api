const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

// /register 
router.post('/', registerController.handleNewUser);

// /register/subreg 
router.post('/subreg', registerController.handleNewUser);

module.exports = router;