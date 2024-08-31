// backend/models/Expert.js
const mongoose = require('mongoose');

const ExpertSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  id: { type: Number, required: true },
  name: { type: String, required: true },
  skills: { type: String, required: true },
  experience: { type: Number, required: true },
  assignedCandidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' }], // New field for assigned candidates
});

module.exports = mongoose.model('Expert', ExpertSchema);
