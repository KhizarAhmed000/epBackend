const express = require("express");
const router = express.Router();
const engineerController = require('../controller/engineer')
const userController = require('../controller/user')

router.post('/createEngineer',engineerController.createEngineer)
router.post('/approveEngineer',engineerController.approveEngineer)
router.get('/getAllEngineers',engineerController.getAllEngineers)
router.get('/getAllMembers',)

module.exports = router