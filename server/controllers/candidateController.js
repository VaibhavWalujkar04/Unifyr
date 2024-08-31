// backend/controllers/candidateController.js
const Candidate = require('../models/Candidate');
const { generateVectors } = require('../utils/vector_utils');

exports.createCandidateProfile = async (req, res) => {
  const { basicInfo } = req.body;

  try {
    const { tfidfVector, bertEmbedding, combinedVector } = await generateVectors(basicInfo);
    const candidate = new Candidate({ user: req.user.userId, basicInfo, tfidfVector, bertEmbedding, combinedVector });
    await candidate.save();
    res.status(201).json({ message: 'Candidate profile created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCandidateById = async (req, res) => {
  const { candidateId } = req.params;

  try {
    const candidate = await Candidate.findById(candidateId).populate('assignedTo');
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    res.status(200).json(candidate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};