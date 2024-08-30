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
