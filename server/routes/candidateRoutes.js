// backend/routes/candidateRoutes.js
const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, candidateController.createCandidateProfile);
router.get('/:candidateId', authMiddleware, candidateController.getCandidateById);

module.exports = router;
