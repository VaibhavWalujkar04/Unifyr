const mongoose = require('mongoose');

const ExpertSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  name: { type: String, required: true },
  skills: { type: String, required: true },
  experience: { type: Number, required: true },
  assignedCandidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' }]
});

module.exports = mongoose.model('Expert', ExpertSchema);
