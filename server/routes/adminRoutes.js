const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.get('/candidates', authMiddleware, adminMiddleware, adminController.getAllCandidatesWithExperts); // Get all candidates with their assigned experts
router.get('/experts', authMiddleware, adminMiddleware, adminController.getAllExpertsWithCandidates); // Get all experts with their assigned candidates

module.exports = router;
