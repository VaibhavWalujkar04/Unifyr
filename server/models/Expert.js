// backend/models/Expert.js
const mongoose = require('mongoose');

const ExpertSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  basicInfo: { type: Object, required: true },
  tfidfVector: { type: [Number], required: true },
  bertEmbedding: { type: [Number], required: true },
  combinedVector: { type: [Number], required: true },
  assignedCandidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' }], // New field for assigned candidates
});

module.exports = mongoose.model('Expert', ExpertSchema);
