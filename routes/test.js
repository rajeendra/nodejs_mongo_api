const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

// /testapi

router.route('/')
    .get(testController.getMemes)
    //.post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.createNewEmployee)
    //.put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.updateEmployee)
    //.delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);


router.route('/todos').get(testController.getTodos)
router.route('/todos/:id').get(testController.getTodos)

module.exports = router;