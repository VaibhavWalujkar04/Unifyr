const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  skills: { type: String, required: true },
  experience: { type: Number, required: true },
  assignedTo: [{
    expert: { type: mongoose.Schema.Types.ObjectId, ref: 'Expert' },
    score: { type: Number, required: true }
  }],
});

module.exports = mongoose.model('Candidate', CandidateSchema);
