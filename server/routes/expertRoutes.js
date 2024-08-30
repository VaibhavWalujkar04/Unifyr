// backend/routes/expertRoutes.js
const express = require('express');
const router = express.Router();
const expertController = require('../controllers/expertController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, expertController.createExpertProfile);
router.post('/:expertId/assign', authMiddleware, expertController.assignCandidateToExpert);
router.get('/:expertId/candidates', authMiddleware, expertController.getCandidatesAssignedToExpert);

module.exports = router;
