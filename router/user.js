const express = require("express");
const router = express.Router();
const engineerController = require('../controller/engineer')
const userController = require('../controller/user')

router.post('/createEngineer',engineerController.createEngineer)
router.post('/removeEngineer',engineerController.removeEngineer)
router.post('/createProject',engineerController.createProject)
router.post('/createAppointment',engineerController.createAppointment)
router.post('/getEngineerProjects',engineerController.getEngineerProjects)
router.post('/getEngineer',engineerController.getEngineer)
router.post('/removeProject',engineerController.removeProject)
router.post('/getAppointmentsByIds',engineerController.getAppointmentsByIds)
router.post('/hireEngineer',engineerController.hireEngineer)
router.post('/approveEngineer',engineerController.approveEngineer)
router.get('/getAllEngineers',engineerController.getAllEngineers)
router.get('/getAllMembers',userController.getAllMembers)

module.exports = router