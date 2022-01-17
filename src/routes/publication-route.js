'use strict' 

const express = require('express');
const router = express.Router();
const controller = require('../controllers/publication-controler');
const authService = require('..//services/auth-service');

router.get('/', authService.authorize, controller.get);
router.post('/', authService.authorize, controller.post); 
router.put('/:id', authService.authorize, controller.put); 
router.get('/:id', authService.authorize, controller.getById); 
router.delete('/:id', authService.authorize, controller.delete); 

module.exports = router;