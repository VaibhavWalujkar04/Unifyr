// backend/routes/candidateRoutes.js
const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, candidateController.createCandidateProfile);

module.exports = router;
