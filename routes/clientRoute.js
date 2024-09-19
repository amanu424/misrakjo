const express = require('express');
const clientController = require('../controllers/clientController');
const multer = require('multer');
const upload = require('../middleware/multer.js');
const isAuthenticated = require('../middleware/authMiddlware.js'); // Import session middleware

const router = express.Router();

// Protect routes with isAuthenticated
router.get('/', clientController.getClients);
router.post('/clients', isAuthenticated, upload.single('photo'), clientController.addClient);
router.put('/clients/:id', isAuthenticated, clientController.updateClient);
router.delete('/clients/:id', isAuthenticated, clientController.deleteClient);

module.exports = router;