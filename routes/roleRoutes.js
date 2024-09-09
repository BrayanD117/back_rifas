const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/roleController');

router.post('/', RoleController.createRole);
router.get('/', RoleController.getAllRoles);
router.get('/:id', RoleController.getRoleById);
router.put('/:id', RoleController.updateRole);
router.delete('/:id', RoleController.deleteRole);

module.exports = router;
