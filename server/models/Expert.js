const mongoose = require('mongoose');

const ExpertSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  basicInfo: { type: Object, required: true },
  subject: { type: String, required: true }, // New field for subject
  tfidfVector: { type: [Number], required: true },
  bertEmbedding: { type: [Number], required: true },
  combinedVector: { type: [Number], required: true },
  assignedCandidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' }],
});

module.exports = mongoose.model('Expert', ExpertSchema);
