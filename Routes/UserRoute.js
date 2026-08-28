const express = require('express');
const router = express.Router(); //S

//import the product controller
const userController = require('../Controllers/UserController')

//define the routes
router.post('/createuser', userController.createuser);
router.post('/loginuser', userController.loginuser);

//export the router
module.exports = router;
