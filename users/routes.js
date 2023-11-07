const router = require('express').Router();

//Constroller Imports
const UserController = require('./controller/UserController');

router.get('/all', UserController.getAllUsers);

module.exports = router;