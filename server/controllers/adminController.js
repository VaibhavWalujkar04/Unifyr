const Candidate = require('../models/Candidate');
const Expert = require('../models/Expert');

exports.getAllCandidatesWithExperts = async (req, res) => {
  try {
    const candidates = await Candidate.find().populate('assignedTo.expert');
    res.status(200).json(candidates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all experts with their assigned candidates
exports.getAllExpertsWithCandidates = async (req, res) => {
  try {
    const experts = await Expert.find().populate('assignedCandidates');
    res.status(200).json(experts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
