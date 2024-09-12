const express = require('express');
const router = express.Router();
const AuthorityController = require('../controllers/authorityController');

router.post('/', AuthorityController.createAuthority);

router.get('/', AuthorityController.getAllAuthorities);

router.get('/:id', AuthorityController.getAuthorityById);

router.put('/:id', AuthorityController.updateAuthority);

router.delete('/:id', AuthorityController.deleteAuthority);

module.exports = router;
