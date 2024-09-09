const express = require('express');
const router = express.Router();
const AuthorityController = require('../controllers/authorityController');

router.post('/authorities', AuthorityController.createAuthority);

router.get('/authorities', AuthorityController.getAllAuthorities);

router.get('/authorities/:id', AuthorityController.getAuthorityById);

router.put('/authorities/:id', AuthorityController.updateAuthority);

router.delete('/authorities/:id', AuthorityController.deleteAuthority);

module.exports = router;
