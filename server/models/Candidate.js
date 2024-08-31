// backend/models/Candidate.js
const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  id: { type: Number, required: true },
  name: { type: String, required: true },
  skills: { type: String, required: true },
  experience: { type: Number, required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Expert', default: null }, // New field for assigned expert
});

module.exports = mongoose.model('Candidate', CandidateSchema);
