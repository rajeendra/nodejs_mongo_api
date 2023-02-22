// contacts

const express = require('express');
const router = express.Router();
const contactController = require('../../controllers/contactController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.User), contactController.getAllContacts)
    .put(verifyRoles(ROLES_LIST.User, ROLES_LIST.Admin, ROLES_LIST.Editor), contactController.updateContact)
    .post(verifyRoles(ROLES_LIST.User, ROLES_LIST.Admin, ROLES_LIST.Editor), contactController.addContact);
    //.delete(verifyRoles(ROLES_LIST.User, ROLES_LIST.Admin, ROLES_LIST.Editor), contactController.deleteContact);

    router.route('/delete')
    .post(verifyRoles(ROLES_LIST.User, ROLES_LIST.Admin, ROLES_LIST.Editor), contactController.deleteContact)


    // router.route('/')
//     .get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
//     .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

// router.route('/:id')
//     .get(verifyRoles(ROLES_LIST.Admin), usersController.getUser);

module.exports = router;